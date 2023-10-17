import type { AssetType, PhotoIdentifier } from '@react-native-camera-roll/camera-roll';

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

export type PhotoActions = InitPhotos | AddPhotos;

export type PhotoSelectState = {
    currentSelectedPhoto: PhotoIdentifier | null;
    selectedPhotos: PhotoIdentifier[];
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

export type PhotoSelectActions = SelectPhoto | DeleteSelectedPhoto | InitCurrentPhoto;

export type FetchPhotosProps = {
    first: number;
    after?: string | undefined;
    assetType?: AssetType | undefined;
};
