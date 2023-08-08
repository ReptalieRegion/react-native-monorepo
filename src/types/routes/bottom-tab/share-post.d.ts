declare module '<BottomTabSharePostRoutes>' {
    import { RouteProp } from '@react-navigation/native';
    import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

    type BottomTabSharePostListNavigationProp = NativeStackNavigationProp<BottomTabSharePostParamList, 'share-post/list'>;

    type BottomTabSharePostDetailNavigationProp = NativeStackNavigationProp<BottomTabSharePostParamList, 'share-post/detail'>;
    type BottomTabSharePostDetailProps = { userId: string; nickname: string };
    type BottomTabSharePostDetailRouteProp = RouteProp<BottomTabSharePostParamList, 'share-post/detail'>;

    type BottomTabSharePostParamList = {
        'share-post/list': undefined;
        'share-post/detail': BottomTabSharePostDetailProps;
    };
}
