declare module '<Routes>' {
    import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

    type RootStackParamList = {
        HomePage: undefined;
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

    type HomePageNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomePage'>;

    type ImageCropPageNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ImageCropPage'>;

    type SharePostWritePageNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SharePostWritePage'>;
}
