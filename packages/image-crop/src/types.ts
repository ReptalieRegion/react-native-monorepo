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

export type { ImageCropActions, ImageCropProps, ImageCropState };
