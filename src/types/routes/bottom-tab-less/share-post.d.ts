declare module '<BottomTabLessSharePostRoutes>' {
    import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

    type BottomTabLessSharePostDetailNavigationProp = NativeStackNavigationProp<
        BottomTabLessSharePostParamList,
        'share-post/detail'
    >;
    type BottomTabLessSharePostDetailProps = { userId: string; nickname: string };
    type BottomTabLessSharePostRouteProp = RouteProp<BottomTabLessSharePostParamList, 'share-post/detail'>;

    type BottomTabLessSharePostWriteNavigationProp = NativeStackNavigationProp<
        BottomTabLessSharePostParamList,
        'share-post/write'
    >;

    type BottomTabLessSharePostImageCropNavigationProp = NativeStackNavigationProp<
        BottomTabLessSharePostParamList,
        'share-post/image-crop'
    >;

    type BottomTabLessSharePostParamList = {
        'share-post/detail': BottomTabLessSharePostDetailProps;
        'share-post/write': undefined;
        'share-post/image-crop': undefined;
    };
}
