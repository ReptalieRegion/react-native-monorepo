import type { NavigatorScreenParams } from '@react-navigation/native';

import type { SignInParams } from '../params/auth';
import type { CalendarDetailParams, EntityDetailParams, EntityUpdateParams } from '../params/diary';
import type { LicenseContentsParams } from '../params/me';
import type { PostingUpdateParams } from '../params/sharePost';

import type { SignUpParamList } from './auth';
import type { BottomTabNativeStackParamList } from './bottom-tab';
import type { EntityManagerCreateParamList } from './diary';
import type { PostingParamList, SharePostModalParamList } from './sharePost';

type RootRoutesParamList = {
    // 바텀 탭
    'bottom-tab/routes': NavigatorScreenParams<BottomTabNativeStackParamList>;

    playground: undefined;
    'playground-flash-list': undefined;

    //Home
    homepage: undefined;

    // Auth
    'sign-in': SignInParams;
    'sign-up': NavigatorScreenParams<SignUpParamList>;

    // Me
    'me/license': undefined;
    'me/terms-of-use': undefined;
    'me/terms-privacy-policy': undefined;
    'me/license/contents': LicenseContentsParams;
    'me/profile': undefined;
    'me/notification-setting': undefined;
    'me/notification-log': undefined;
    'me/notice': undefined;
    'me/block-user/list': undefined;

    // SharePost
    'share-post/modal': NavigatorScreenParams<SharePostModalParamList>;
    'share-post/modal/posting': NavigatorScreenParams<PostingParamList>;
    'share-post/post/update': PostingUpdateParams;

    // Entity
    'entity-manager/create': NavigatorScreenParams<EntityManagerCreateParamList>;
    'entity-manager/detail': EntityDetailParams;
    'entity-manager/update': EntityUpdateParams;

    // Calendar
    'calendar/create': undefined;
    'calendar/detail': CalendarDetailParams;
};

export type { RootRoutesParamList };
