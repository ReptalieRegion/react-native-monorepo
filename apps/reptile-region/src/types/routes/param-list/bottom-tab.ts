import type { NavigatorScreenParams } from '@react-navigation/native';

import type { HomeBottomTabParamList } from './home';
import type { InfoBottomTabParamList } from './info';
import type { MeBottomTabParamList } from './me';
import type { CommentParamList, SharePostBottomTabParamList } from './sharePost';
import type { ShopBottomTabParamList } from './shop';

// 바텀 탭 라우터
type BottomTabParamList = {
    'home/routes': NavigatorScreenParams<HomeBottomTabParamList>;
    'info/routes': NavigatorScreenParams<InfoBottomTabParamList>;
    'me/routes': NavigatorScreenParams<MeBottomTabParamList>;
    'share-post/routes': NavigatorScreenParams<SharePostBottomTabParamList>;
    'shop/routes': NavigatorScreenParams<ShopBottomTabParamList>;
};

// 바텀 탭 위에 모달을 띄우기 위한 라우터
type BottomTabNativeStackParamList = {
    tab: NavigatorScreenParams<BottomTabParamList>;
    'bottom-tab/modal/comment': NavigatorScreenParams<CommentParamList>;
};

export type { BottomTabNativeStackParamList, BottomTabParamList };
