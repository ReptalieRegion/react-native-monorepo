import type { ImageType } from '<image>';

export type PostUpdateImageState = {
    images: ImageType[];
};

interface DeleteImage {
    type: 'DELETE_IMAGE';
    uri: string;
}

interface InitImage {
    type: 'INIT_IMAGE';
    images: ImageType[];
}

export type PostUpdateImageActions = DeleteImage | InitImage;
