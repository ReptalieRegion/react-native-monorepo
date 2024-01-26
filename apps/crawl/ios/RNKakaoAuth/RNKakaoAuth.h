//
//  RNKakaoAuth.h
//  crawl
//
//  Created by Yun Chan Park on 10/21/23.
//
@class RNKakaoAuth;

@interface RNKakaoAuth : NSObject
- (RNKakaoAuth *)returnSwiftClassInstance;
+ (BOOL)isKakaoTalkLoginUrl:(NSURL *)url;
+ (BOOL)handleOpenUrl:(NSURL *)url;
@end
