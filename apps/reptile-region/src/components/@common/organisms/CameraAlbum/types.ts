import type { AssetType } from '@react-native-camera-roll/camera-roll';
import type { ImageCropData } from '@react-native-community/image-editor';

export type Photo = {
    uri: string;
    name: string;
};

export type CropInfo = ImageCropData & {
    x: number;
    y: number;
    scale: number;
};

export type PhotoState = {
    photos: Photo[] | null;
};

interface InitPhotos {
    type: 'INIT_PHOTOS';
    photos: Photo[] | null;
}

interface AddPhotos {
    type: 'ADD_PHOTOS';
    photos: Photo[] | null;
}

interface SavePhoto {
    type: 'SAVE_PHOTO';
    photo: Photo | null;
}

export type PhotoActions = InitPhotos | AddPhotos | SavePhoto;

export type PhotoSelectState = {
    currentSelectedPhoto: { origin: Photo | null; crop?: CropInfo } | null;
    selectedPhotos: { origin: Photo; crop?: CropInfo }[];
    croppedSelectedPhotos: Photo[];
    maxPhotoCount: number;
    isLimit: boolean;
};

export interface SelectPhoto {
    type: 'SELECT_PHOTO';
    photo: Photo;
}

export interface DeleteSelectedPhoto {
    type: 'DELETE_SELECTED_PHOTO';
    uri: string;
}

export interface InitCurrentPhoto {
    type: 'INIT_CURRENT_PHOTO';
    photo: Photo | null;
}

export interface CroppedPhoto {
    type: 'CROPPED_PHOTO';
    originalUri: string;
    crop?: CropInfo;
}

export interface CroppedSelectedPhoto {
    type: 'CROPPED_SELECT_PHOTO';
    croppedSelectedPhoto: Photo;
    index: number;
}

export interface FinishedLimitCallback {
    type: 'FINISHED_LIMIT_CALLBACK';
}

export type PhotoSelectActions =
    | SelectPhoto
    | DeleteSelectedPhoto
    | InitCurrentPhoto
    | CroppedPhoto
    | CroppedSelectedPhoto
    | FinishedLimitCallback;

export type FetchPhotosProps = {
    first: number;
    after?: string | undefined;
    assetType?: AssetType | undefined;
    isInit?: boolean;
};
