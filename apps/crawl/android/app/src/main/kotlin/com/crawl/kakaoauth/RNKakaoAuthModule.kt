package com.crawl.kakaoauth

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap

import com.kakao.sdk.auth.model.OAuthToken
import com.kakao.sdk.common.KakaoSdk
import com.kakao.sdk.common.model.ClientError
import com.kakao.sdk.common.model.ClientErrorCause
import com.kakao.sdk.user.UserApiClient

import java.text.SimpleDateFormat
import java.util.Date

class RNKakaoAuthModule(private var reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "RNKakaoAuth"
    }

    private fun convertValue(`val`: Boolean?): Boolean {
        return `val` ?: false
    }

    private fun dateFormat(date: Date?): String {
        val sdf = SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
        return sdf.format(date)
    }

    private fun parsingToken(token: OAuthToken): WritableMap {
        val (accessToken, accessTokenExpiresAt, refreshToken, refreshTokenExpiresAt, scopes) = token
        val map = Arguments.createMap()
        map.putString("accessToken", accessToken)
        map.putString("accessTokenExpiresAt", dateFormat(accessTokenExpiresAt))
        map.putString("refreshToken", refreshToken)
        map.putString("refreshTokenExpiresAt", dateFormat(refreshTokenExpiresAt))

        val scopeArray = Arguments.createArray()
        if (scopes != null) {
            for (scope in scopes) {
                scopeArray.pushString(scope)
            }
        }
        map.putArray("scopes", scopeArray)

        return map
    }

    @ReactMethod
    private fun login(promise: Promise) {
        if(UserApiClient.instance.isKakaoTalkLoginAvailable(reactContext)) {
            val activity = currentActivity

            if (activity == null) {
                promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist")
            }

            UserApiClient.instance.loginWithKakaoTalk(reactContext) { token, error ->
                if (error != null) {
                    if (error is ClientError && error.reason == ClientErrorCause.Cancelled) {
                        promise.reject("RNKakaoAuth", error.message, error)
                        return@loginWithKakaoTalk
                    }
                } else if (token != null) {
                    val result = this.parsingToken(token)
                    promise.resolve(result)
                    return@loginWithKakaoTalk
                } else {
                    promise.reject("RNKakaoAuth", TOKEN_NULL)
                }
            }
        } else {
            UserApiClient.instance.loginWithKakaoAccount(reactContext) { token, error ->
                if (error != null) {
                    promise.reject("RNKakaoAuth", error.message, error)
                    return@loginWithKakaoAccount
                }
                else if (token != null) {
                    val result = this.parsingToken(token)
                    promise.resolve(result)
                    return@loginWithKakaoAccount
                }
                else {
                    promise.reject("RNKakaoAuth", TOKEN_NULL)
                }
            }
        }
    }

    @ReactMethod
    private fun logout(promise: Promise) {
        UserApiClient.instance.logout { error ->
            if (error != null) {
                promise.reject("RNKakaoAuth", error.message, error)
            }
            else {
                promise.resolve("Successfully logged out")
            }
        }
    }

    @ReactMethod
    private fun getProfile(promise: Promise) {
        UserApiClient.instance.me { user, error ->
            if (error != null) {
                promise.reject("RNKakaoAuth", error.message, error)
            }
            else if (user != null) {
                val map = Arguments.createMap()
                map.putString("id", user.id.toString())
                val kakaoUser = user.kakaoAccount
                if (kakaoUser != null) {
                    map.putString("email", kakaoUser?.email.toString())
                    map.putString("nickname", kakaoUser.profile?.nickname)
                    map.putString("profileImageUrl", kakaoUser.profile?.profileImageUrl)
                    map.putString("thumbnailImageUrl", kakaoUser.profile?.thumbnailImageUrl)
                    map.putString("phoneNumber", kakaoUser.phoneNumber.toString())
                    map.putString("ageRange", kakaoUser.ageRange.toString())
                    map.putString("birthday", kakaoUser.birthday.toString())
                    map.putString("birthdayType", kakaoUser.birthdayType.toString())
                    map.putString("birthyear", kakaoUser.birthyear.toString())
                    map.putString("gender", kakaoUser.gender.toString())
                    map.putBoolean("isEmailValid", convertValue(kakaoUser.isEmailValid))
                    map.putBoolean("isEmailVerified", convertValue(kakaoUser.isEmailVerified))
                    map.putBoolean("isKorean", convertValue(kakaoUser.isKorean))
                    map.putBoolean("ageRangeNeedsAgreement", convertValue(kakaoUser.ageRangeNeedsAgreement))
                    map.putBoolean("birthdayNeedsAgreement", convertValue(kakaoUser.birthdayNeedsAgreement))
                    map.putBoolean("birthyearNeedsAgreement", convertValue(kakaoUser.birthyearNeedsAgreement))
                    map.putBoolean("emailNeedsAgreement", convertValue(kakaoUser.emailNeedsAgreement))
                    map.putBoolean("genderNeedsAgreement", convertValue(kakaoUser.genderNeedsAgreement))
                    map.putBoolean("isKoreanNeedsAgreement", convertValue(kakaoUser.isKoreanNeedsAgreement))
                    map.putBoolean("phoneNumberNeedsAgreement", convertValue(kakaoUser.phoneNumberNeedsAgreement))
                    map.putBoolean("profileNeedsAgreement", convertValue(kakaoUser.profileNeedsAgreement))
                }
                promise.resolve(map)
                return@me
            }

            promise.reject("RNKakaoLogins", "User is null")
        }
    }

    companion object {
        const val E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST"
        const val TOKEN_NULL = "Token is null"
    }

    init {
        KakaoSdk.init(context = reactContext, appKey = "fb6048a72a53141ec9a16c06ca98a10d")
    }
}