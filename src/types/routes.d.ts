declare module '<Routes>' {
    import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

    type RootStackParamList = {
        HomePage: undefined;
        ImageCropPage: undefined;
    };

    type HomePageNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomePage'>;

    type ImageCropPageNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ImageCropPage'>;
}
