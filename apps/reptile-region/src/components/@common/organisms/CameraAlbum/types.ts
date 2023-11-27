import type { AssetType, PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import type { ImageCropData } from '@react-native-community/image-editor';

export type CropInfo = ImageCropData & {
    x: number;
    y: number;
    scale: number;
};

export type PhotoState = {
    photos: PhotoIdentifier[] | null;
};

interface InitPhotos {
    type: 'INIT_PHOTOS';
    photos: PhotoIdentifier[] | null;
}

interface AddPhotos {
    type: 'ADD_PHOTOS';
    photos: PhotoIdentifier[] | null;
}

interface SavePhoto {
    type: 'SAVE_PHOTO';
    photo: PhotoIdentifier | null;
}

export type PhotoActions = InitPhotos | AddPhotos | SavePhoto;

export type PhotoSelectState = {
    currentSelectedPhoto: { origin: PhotoIdentifier | null; crop?: CropInfo } | null;
    selectedPhotos: { origin: PhotoIdentifier; crop?: CropInfo }[];
    croppedSelectedPhotos: PhotoIdentifier[];
    isLimit: boolean;
};

interface SelectPhoto {
    type: 'SELECT_PHOTO';
    photo: PhotoIdentifier;
    limit: number | undefined;
}

interface DeleteSelectedPhoto {
    type: 'DELETE_SELECTED_PHOTO';
    uri: string;
}

interface InitCurrentPhoto {
    type: 'INIT_CURRENT_PHOTO';
    photo: PhotoIdentifier | null;
}

interface CroppedPhoto {
    type: 'CROPPED_PHOTO';
    originalUri: string;
    crop?: CropInfo;
}

interface CroppedSelectedPhoto {
    type: 'CROPPED_SELECT_PHOTO';
    croppedSelectedPhoto: PhotoIdentifier;
    index: number;
}

export type PhotoSelectActions = SelectPhoto | DeleteSelectedPhoto | InitCurrentPhoto | CroppedPhoto | CroppedSelectedPhoto;

export type FetchPhotosProps = {
    first: number;
    after?: string | undefined;
    assetType?: AssetType | undefined;
    isInit?: boolean;
};
