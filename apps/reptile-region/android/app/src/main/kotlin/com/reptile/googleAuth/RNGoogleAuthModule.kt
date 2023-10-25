package com.reptile.googleAuth

import android.app.Activity
import android.content.Intent
import android.content.IntentSender
import android.util.Log

import com.facebook.react.bridge.BaseActivityEventListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.bridge.WritableMap

import com.google.android.gms.auth.api.identity.BeginSignInRequest
import com.google.android.gms.auth.api.identity.Identity
import com.google.android.gms.auth.api.identity.SignInClient
import com.google.android.gms.auth.api.identity.SignInCredential
import com.google.android.gms.auth.api.signin.GoogleSignInStatusCodes
import com.google.android.gms.common.api.ApiException
import com.google.android.gms.common.api.CommonStatusCodes
import com.google.android.gms.tasks.Task

import com.reptileregionreactnativ.R


class RNGoogleAuthModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private var oneTapClient: SignInClient? = null
    private var signInRequest: BeginSignInRequest? = null
    private val promiseWrapper: PromiseWrapper = PromiseWrapper()
    private val utils: Utils = Utils()

    init {
        oneTapClient = Identity.getSignInClient(reactContext)
        signInRequest = BeginSignInRequest.builder()
                .setPasswordRequestOptions(BeginSignInRequest.PasswordRequestOptions.builder()
                        .setSupported(true)
                        .build())
                .setGoogleIdTokenRequestOptions(
                        BeginSignInRequest.GoogleIdTokenRequestOptions.builder()
                                .setSupported(true)
                                .setServerClientId(reactContext.getString(R.string.default_web_client_id))
                                .setFilterByAuthorizedAccounts(false)
                                .build())
                .setAutoSelectEnabled(true)
                .build()
        reactContext.addActivityEventListener(RNGoogleOneTapSignInActivityEventListener())
    }

    override fun getName() = REACT_CLASS


    @ReactMethod
    fun login(promise: Promise) {
        val currentOneTapClient = oneTapClient
        if (currentOneTapClient == null) {
            rejectWithNullClientError(promise)
            return
        }

        val activity = currentActivity
        if (activity == null) {
            promise.reject(REACT_CLASS, "activity is null")
            return
        }

        promiseWrapper.setPromise(promise)
        UiThreadUtil.runOnUiThread {
            currentOneTapClient.beginSignIn(signInRequest!!)
                    .addOnSuccessListener(activity) { result ->
                        try {
                            activity.startIntentSenderForResult(
                                    result.pendingIntent.intentSender, REQ_ONE_TAP,
                                    null, 0, 0, 0, null
                            )
                        } catch (e: IntentSender.SendIntentException) {
                            Log.e(TAG, "Couldn't start One Tap UI: ${e.localizedMessage}")
                            promise.reject(REACT_CLASS, e.localizedMessage)
                        }
                    }
                    .addOnFailureListener(activity) { e ->
                        Log.e(REACT_CLASS, "No Google Accounts found: " + e.localizedMessage)
                        promise.reject(REACT_CLASS, e.localizedMessage)
                    }
        }
    }

    @ReactMethod
    fun logout(promise: Promise) {
        val currentOneTapClient = oneTapClient
        if (currentOneTapClient == null) {
            rejectWithNullClientError(promise)
            return
        }

        currentOneTapClient.signOut()
                .addOnCompleteListener { task ->
                    handleSignOutOrRevokeAccessTask(task, promise)
                }
    }

    private inner class RNGoogleOneTapSignInActivityEventListener : BaseActivityEventListener() {

        override fun onActivityResult(activity: Activity, requestCode: Int, resultCode: Int, intent: Intent?) {
            if (requestCode == REQ_ONE_TAP) {
                try {
                    val credential: SignInCredential = oneTapClient!!.getSignInCredentialFromIntent(intent)
                    val userParams: WritableMap? = utils.getUserProperties(credential)
                    promiseWrapper.resolve(userParams)
                } catch (e: ApiException) {
                    when (val code = e.statusCode) {
                        CommonStatusCodes.CANCELED -> {
                            val errorDescription = GoogleSignInStatusCodes.getStatusCodeString(code)
                            promiseWrapper.reject(code.toString(), errorDescription)
                        }
                        else -> {
                            val errorDescription = GoogleSignInStatusCodes.getStatusCodeString(code)
                            promiseWrapper.reject(code.toString(), errorDescription)
                        }
                    }
                }
            } else if (requestCode == REQUEST_CODE_GIS_SAVE_PASSWORD) {
                if (resultCode == Activity.RESULT_OK) {
                    /* password was saved */
                    promiseWrapper.resolve(true)
                } else if (resultCode == Activity.RESULT_CANCELED) {
                    /* password saving was cancelled */
                    promiseWrapper.resolve(false)
                }
            }
        }
    }

    private fun handleSignOutOrRevokeAccessTask(task: Task<Void>, promise: Promise) {
        if (task.isSuccessful) {
            promise.resolve(null)
        } else {
            val code: Int = utils.getExceptionCode(task)
            val errorDescription = GoogleSignInStatusCodes.getStatusCodeString(code)
            promise.reject(code.toString(), errorDescription)
        }
    }

    private fun rejectWithNullClientError(promise: Promise) {
        promise.reject(REACT_CLASS, "oneTapClient is null - call configure first")
    }

    companion object {
        const val REACT_CLASS = "RNGoogleAuthModule"
        const val TAG = "RNGoogleAuthModule"
        const val REQ_ONE_TAP = 2
        const val REQUEST_CODE_GIS_SAVE_PASSWORD = 3
    }
}