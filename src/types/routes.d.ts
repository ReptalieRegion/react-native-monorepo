declare module '<Routes>' {
    import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

    type MainStackParamList = RootStackParamList & TabStackParamList;

    type HomeListNavigationProp = NativeStackNavigationProp<MainStackParamList, 'home/list'>;

    type ShopListNavigationProp = NativeStackNavigationProp<MainStackParamList, 'shop/list'>;

    type SharePostListNavigationProp = NativeStackNavigationProp<MainStackParamList, 'share-post/list'>;

    type SharePostImageCropPageNavigationProp = NativeStackNavigationProp<MainStackParamList, 'share-post/image-crop'>;

    type SharePostWritePageNavigationProp = NativeStackNavigationProp<MainStackParamList, 'share-post/write'>;

    type SharePostDetailPageNavigationProp = NativeStackNavigationProp<MainStackParamList, 'share-post/detail'>;
    type SharePostDetailPageProp = { userId: string; name: string };

    type InfoListNavigationProp = NativeStackNavigationProp<MainStackParamList, 'info/list'>;

    type MyListNavigationProp = NativeStackNavigationProp<MainStackParamList, 'my/list'>;

    type HomePageNavigationProp = NativeStackNavigationProp<MainStackParamList, 'HomePage'>;

    type RootStackParamList = {
        HomePage: undefined;
        'share-post/detail': SharePostDetailPageProp;
        'share-post/image-crop': undefined;
        'share-post/write': undefined;
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
