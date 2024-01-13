import type { ImageProps, ImageSourcePropType } from 'react-native';

type ImageZoomProps = Pick<ImageProps, 'onLayout'> & {
    uri?: string;
    minScale?: number;
    maxScale?: number;
    minPanPointers?: number;
    maxPanPointers?: number;
    isPanEnabled?: boolean;
    isPinchEnabled?: boolean;
    onInteractionStart?(): void;
    onInteractionEnd?(uri: string, props: CropInfo): void;
    onPinchStart?(): void;
    onPinchEnd?(): void;
    onPanStart?(): void;
    onPanEnd?(): void;
    source?: ImageSourcePropType;
    containerStyle: {
        width: number;
        height: number;
    };
    imageStyle: {
        width: number;
        height: number;
    };
    initial?: {
        x: number;
        y: number;
        focalX: number;
        focalY: number;
        scale: number;
    };
};

type ImageZoomLayoutState = {
    center: {
        x: number;
        y: number;
    };
};

type ImageZoomUseLayoutProps = Pick<ImageZoomProps, 'onLayout'>;

type ImageZoomUseGesturesProps = {
    imageUri: string;
    originImageSize: {
        width: number;
        height: number;
    };
    imageSize: {
        width: number;
        height: number;
    };
    screenSize: {
        width: number;
        height: number;
    };
} & Pick<ImageZoomLayoutState, 'center'> &
    Pick<
        ImageZoomProps,
        | 'minScale'
        | 'maxScale'
        | 'minPanPointers'
        | 'maxPanPointers'
        | 'isPanEnabled'
        | 'isPinchEnabled'
        | 'onInteractionStart'
        | 'onInteractionEnd'
        | 'onPinchStart'
        | 'onPinchEnd'
        | 'onPanStart'
        | 'onPanEnd'
        | 'initial'
    >;
type CropInfo = {
    size: {
        width: number;
        height: number;
    };
    offset: {
        x: number;
        y: number;
    };
    translation: {
        x: number;
        y: number;
        focalX: number;
        focalY: number;
        scale: number;
    };
};

type ImageCropState = {
    image: {
        uri: string;
        width: number;
        height: number;
    };
    width: number;
    height: number;
    initPosition?: {
        x: number;
        y: number;
        scale: number;
    };
    minScale: number;
    maxScale: number;
};

interface ImageCropActions {
    getCropInfo?(originalUri: string, props: CropInfo): void;
}

type ImageCropProps = ImageCropState & ImageCropActions;

export type {
    CropInfo,
    ImageCropActions,
    ImageCropProps,
    ImageCropState,
    ImageZoomLayoutState,
    ImageZoomProps,
    ImageZoomUseGesturesProps,
    ImageZoomUseLayoutProps,
};
