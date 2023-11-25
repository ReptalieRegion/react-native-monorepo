import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { SharePostBottomTabParamList, SharePostModalParamList } from '@/types/routes/param-list/sharePost';

type LikeListPageScreenProps =
    | NativeStackScreenProps<SharePostBottomTabParamList, 'bottom-tab/like/list'>
    | NativeStackScreenProps<SharePostModalParamList, 'modal/like/list'>;

export type { LikeListPageScreenProps };
