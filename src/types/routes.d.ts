declare module '<Routes>' {
    import { RouteProp } from '@react-navigation/native';
    import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

    type MainStackParamList = RootStackParamList & TabStackParamList;

    type HomeListNavigationProp = NativeStackNavigationProp<MainStackParamList, 'home/list'>;

    type ShopListNavigationProp = NativeStackNavigationProp<MainStackParamList, 'shop/list'>;

    type SharePostListNavigationProp = NativeStackNavigationProp<MainStackParamList, 'share-post/list'>;

    type SharePostImageCropPageNavigationProp = NativeStackNavigationProp<MainStackParamList, 'share-post/image-crop'>;

    type SharePostWritePageNavigationProp = NativeStackNavigationProp<MainStackParamList, 'share-post/write'>;

    type SharePostDetailPageNavigationProp = NativeStackNavigationProp<MainStackParamList, 'share-post/detail'>;
    type SharePostDetailPageProp = { userId: string; nickname: string };
    type SharePostDetailPageRouteProp = RouteProp<MainStackParamList, 'share-post/detail'>;

    type SharePostCommentPageNavigationProp = NativeStackNavigationProp<MainStackParamList, 'share-post/comment'>;
    type SharePostCommentPageProp = { postId: string };
    type SharePostCommentPageRouteProp = RouteProp<MainStackParamList, 'share-post/comment'>;

    type InfoListNavigationProp = NativeStackNavigationProp<MainStackParamList, 'info/list'>;

    type MyListNavigationProp = NativeStackNavigationProp<MainStackParamList, 'my/list'>;

    type HomePageNavigationProp = NativeStackNavigationProp<MainStackParamList, 'HomePage'>;

    type RootStackParamList = {
        HomePage: undefined;
        'share-post/detail': SharePostDetailPageProp;
        'share-post/image-crop': undefined;
        'share-post/write': undefined;
        'share-post/comment': SharePostCommentPageProp;
        'main-routers': undefined;
    };

    type TabStackParamList = {
        'home/list': undefined;
        'shop/list': undefined;
        'share-post/list': undefined;
        'info/list': undefined;
        'my/list': undefined;
    };
}
