import type { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type {
    FollowParamList,
    SharePostBottomTabParamList,
    SharePostModalParamList,
} from '@/types/routes/param-list/sharePost';

/** 팔로워 리스트 */
type FollowerPageScreenProps = MaterialTopTabScreenProps<FollowParamList, 'follower'>;

/** 팔로잉 리스트 */
// ScreenProps
type FollowingPageScreenProps = MaterialTopTabScreenProps<FollowParamList, 'following'>;

/** 좋아요 리스트 또는 모달  */
// ScreenProps
type LikeListPageScreenProps =
    | NativeStackScreenProps<SharePostBottomTabParamList, 'bottom-tab/like/list'>
    | NativeStackScreenProps<SharePostModalParamList, 'modal/like/list'>;

export type { FollowerPageScreenProps, FollowingPageScreenProps, LikeListPageScreenProps };
