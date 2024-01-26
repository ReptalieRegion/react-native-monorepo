//
//  NotificationService.m
//  NotifeeNotificationService
//
//  Created by Yun Chan Park on 11/10/23.
//

#import "NotificationService.h"
#import "NotifeeExtensionHelper.h"

@interface NotificationService ()

@property (nonatomic, strong) void (^contentHandler)(UNNotificationContent *contentToDeliver);
@property (nonatomic, strong) UNMutableNotificationContent *bestAttemptContent;

@end

@implementation NotificationService

- (void)didReceiveNotificationRequest:(UNNotificationRequest *)request withContentHandler:(void (^)(UNNotificationContent * _Nonnull))contentHandler {
    self.contentHandler = contentHandler;
    self.bestAttemptContent = [request.content mutableCopy];
  
    NSMutableDictionary *userInfoDict = [self.bestAttemptContent.userInfo mutableCopy];
    userInfoDict[@"notifee_options"] = [NSMutableDictionary dictionary];
    userInfoDict[@"notifee_options"][@"title"] = [NSString stringWithFormat:@"CRAWL %@", self.bestAttemptContent.title];
    
    [NotifeeExtensionHelper populateNotificationContent:request
                                    withContent: self.bestAttemptContent
                                    withContentHandler:contentHandler];
}

- (void)serviceExtensionTimeWillExpire {
    // Called just before the extension will be terminated by the system.
    // Use this as an opportunity to deliver your "best attempt" at modified content, otherwise the original push payload will be used.
    self.contentHandler(self.bestAttemptContent);
}

@end
