import type { ImageType } from '<image>';

export type PostUpdateImageState = {
    images: ImageType[];
    state: 'MIN_IMAGE' | '';
};

interface DeleteImage {
    type: 'DELETE_IMAGE';
    uri: string;
}

interface InitImage {
    type: 'INIT_IMAGE';
    images: ImageType[];
}

interface ResetState {
    type: 'RESET_STATE';
}

export type PostUpdateImageActions = DeleteImage | InitImage | ResetState;
