//
//  RNKakaoAuth.swift
//  reptileregion
//
//  Created by Yun Chan Park on 10/21/23.
//

import Foundation

import KakaoSDKCommon
import KakaoSDKAuth
import KakaoSDKUser

@objc(RNKakaoAuth)
class RNKakaoAuth: NSObject {
  public override init() {
    let appKey: String = "fb6048a72a53141ec9a16c06ca98a10d"
    KakaoSDK.initSDK(appKey: appKey)
  }

  @objc(isKakaoTalkLoginUrl:)
  public static func isKakaoTalkLoginUrl(url: URL) -> Bool {
    let appKey = try? KakaoSDK.shared.appKey()

    if (appKey != nil) {
      return AuthApi.isKakaoTalkLoginUrl(url)
    }
    
    return false
  }
  
  @objc(handleOpenUrl:)
  public static func handleOpenUrl(url: URL) -> Bool {
    return AuthController.handleOpenUrl(url: url)
  }

  @objc(login:rejecter:)
  func login(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    DispatchQueue.main.async {
      let dateFormatter = DateFormatter()
      dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss";

      if (UserApi.isKakaoTalkLoginAvailable()) {
        UserApi.shared.loginWithKakaoTalk {(oauthToken, error) in
          if let error = error {
            reject("RNKakaoAuth", error.localizedDescription, nil)
          }
          else {
            resolve([
              "accessToken": oauthToken?.accessToken ?? "",
              "refreshToken": oauthToken?.refreshToken ?? "" as Any,
              "idToken": oauthToken?.idToken ?? "",
              "accessTokenExpiresAt": dateFormatter.string(from: oauthToken!.expiredAt),
              "refreshTokenExpiresAt": dateFormatter.string(from: oauthToken!.refreshTokenExpiredAt),
              "scopes": oauthToken?.scopes ?? "",
            ])
          }
        }
      } else {
        UserApi.shared.loginWithKakaoAccount {(oauthToken, error) in
          if let error = error {
            reject("RNKakaoAuth", error.localizedDescription, nil)
          }
          else {
            resolve([
              "accessToken": oauthToken?.accessToken ?? "",
              "refreshToken": oauthToken?.refreshToken ?? "" as Any,
              "idToken": oauthToken?.idToken ?? "",
              "accessTokenExpiresAt": dateFormatter.string(from: oauthToken!.expiredAt),
              "refreshTokenExpiresAt": dateFormatter.string(from: oauthToken!.refreshTokenExpiredAt),
              "scopes": oauthToken?.scopes ?? "",
            ])
          }
        }
      }
    }
  }
  
  @objc(getProfile:rejecter:)
  func getProfile(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    DispatchQueue.main.async {
      UserApi.shared.me() {(user, error) in
        if let error = error {
          reject("RNKakaoAuth", error.localizedDescription, nil)
        }
        else {
          resolve([
            "id": user?.id as Any,
            "name": user?.kakaoAccount?.name as Any,
            "email": user?.kakaoAccount?.email as Any,
            "nickname": user?.kakaoAccount?.profile?.nickname as Any,
            "profileImageUrl": user?.kakaoAccount?.profile?.profileImageUrl?.absoluteString as Any,
            "thumbnailImageUrl": user?.kakaoAccount?.profile?.thumbnailImageUrl?.absoluteString as Any,
            "phoneNumber": user?.kakaoAccount?.phoneNumber as Any,
            "ageRange": user?.kakaoAccount?.ageRange?.rawValue as Any,
            "birthday": user?.kakaoAccount?.birthday as Any,
            "birthdayType": user?.kakaoAccount?.birthdayType as Any,
            "birthyear": user?.kakaoAccount?.birthyear as Any,
            "gender": user?.kakaoAccount?.gender?.rawValue as Any,
            "isEmailValid": user?.kakaoAccount?.isEmailValid as Any,
            "isEmailVerified": user?.kakaoAccount?.isEmailVerified as Any,
            "isKorean": user?.kakaoAccount?.isKorean as Any,
            "ageRangeNeedsAgreement": user?.kakaoAccount?.ageRangeNeedsAgreement as Any,
            "birthdayNeedsAgreement": user?.kakaoAccount?.birthdayNeedsAgreement as Any,
            "birthyearNeedsAgreement": user?.kakaoAccount?.birthyearNeedsAgreement as Any,
            "emailNeedsAgreement": user?.kakaoAccount?.emailNeedsAgreement as Any,
            "genderNeedsAgreement": user?.kakaoAccount?.genderNeedsAgreement as Any,
            "isKoreanNeedsAgreement": user?.kakaoAccount?.isKoreanNeedsAgreement as Any,
            "phoneNumberNeedsAgreement": user?.kakaoAccount?.phoneNumberNeedsAgreement as Any,
            "profileNeedsAgreement": user?.kakaoAccount?.profileNeedsAgreement as Any,
          ])
        }
      }
    }
  }
  
  @objc(logout:rejecter:)
  func logout(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    DispatchQueue.main.async {
      UserApi.shared.logout {(error) in
        if let error = error {
          reject("RNKakaoAuth", error.localizedDescription, nil)
        }
        else {
          resolve("Successfully logged out")
        }
      }
    }
  }
  

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
