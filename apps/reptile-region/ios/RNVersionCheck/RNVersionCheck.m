//
//  RNVersionCheck.m
//  reptileregion
//
//  Created by Yun Chan Park on 10/27/23.
//

#import "RNVersionCheck.h"

@implementation RNVersionCheck

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}
    
- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()


- (NSString*) currentVersion
{
    return [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"] ?: @"0";
}

- (NSDictionary *)constantsToExport
{
    return @{
             @"currentVersion": self.currentVersion,
             };
}

@end
