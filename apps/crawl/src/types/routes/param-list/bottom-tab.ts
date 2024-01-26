import type { NavigatorScreenParams } from '@react-navigation/native';

import type { DiaryParamList } from './diary';
import type { HomeBottomTabParamList } from './home';
import type { MeBottomTabParamList } from './me';
import type { CommentParamList, SharePostBottomTabParamList } from './sharePost';

// 바텀 탭 라우터
type BottomTabParamList = {
    'home/routes': NavigatorScreenParams<HomeBottomTabParamList>;
    'share-post/routes': NavigatorScreenParams<SharePostBottomTabParamList>;
    'diary/routes': NavigatorScreenParams<DiaryParamList>;
    'me/routes': NavigatorScreenParams<MeBottomTabParamList>;

    // TODO 추후 쇼핑 기능 추가할 때 사용
    // 'info/routes': NavigatorScreenParams<InfoBottomTabParamList>;
    // 'shop/routes': NavigatorScreenParams<ShopBottomTabParamList>;
};

// 바텀 탭 위에 모달을 띄우기 위한 라우터
type BottomTabNativeStackParamList = {
    tab: NavigatorScreenParams<BottomTabParamList>;
    'bottom-tab/modal/comment': NavigatorScreenParams<CommentParamList>;
};

export type { BottomTabNativeStackParamList, BottomTabParamList };
