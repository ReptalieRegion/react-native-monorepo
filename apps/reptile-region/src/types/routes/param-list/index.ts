import type { NavigatorScreenParams } from '@react-navigation/native';

import type { SignInParams } from '../params/auth';
import type { LicenseContentsParams } from '../params/me';
import type { OptionsMenuParams, PostingUpdateParams } from '../params/sharePost';

import type { SignUpParamList } from './auth';
import type { BottomTabNativeStackParamList } from './bottom-tab';
import type { PostingParamList, SharePostModalParamList } from './sharePost';

type RootRoutesParamList = {
    // 바텀 탭
    'bottom-tab/routes': NavigatorScreenParams<BottomTabNativeStackParamList>;

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

    // SharePost
    'share-post/modal': NavigatorScreenParams<SharePostModalParamList>;
    'share-post/modal/posting': NavigatorScreenParams<PostingParamList>;
    'share-post/bottom-sheet/post-options-menu': OptionsMenuParams;
    'share-post/post/update': PostingUpdateParams;
};

export type { RootRoutesParamList };
