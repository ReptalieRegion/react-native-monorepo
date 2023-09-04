declare module '<BottomTabLessNavigationList>' {
    import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

    // SharePost
    type BottomTabLessSharePostDetailNavigationProp = NativeStackNavigationProp<BottomTabLessParamList, 'share-post/detail'>;
    type BottomTabLessSharePostDetailProps = { userId?: string; nickname: string };
    type BottomTabLessSharePostRouteProp = RouteProp<BottomTabLessParamList, 'share-post/detail'>;
    type BottomTabLessSharePostWriteNavigationProp = NativeStackNavigationProp<BottomTabLessParamList, 'share-post/write'>;
    type BottomTabLessSharePostImageCropNavigationProp = NativeStackNavigationProp<
        BottomTabLessParamList,
        'share-post/image-crop'
    >;

    // ParamList
    type BottomTabLessParamList = {
        'share-post/detail': BottomTabLessSharePostDetailProps;
        'share-post/write': undefined;
        'share-post/image-crop': undefined;
    };
}
