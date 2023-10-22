//
//  RNKakaoAuth.m
//  reptileregion
//
//  Created by Yun Chan Park on 10/21/23.
//
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNKakaoAuth, NSObject)

RCT_EXTERN_METHOD(login:(RCTPromiseResolveBlock *)resolve rejecter:(RCTPromiseRejectBlock *)reject);
RCT_EXTERN_METHOD(logout:(RCTPromiseResolveBlock *)resolve rejecter:(RCTPromiseRejectBlock *)reject);
RCT_EXTERN_METHOD(getProfile:(RCTPromiseResolveBlock *)resolve rejecter:(RCTPromiseRejectBlock *)reject);

@end
