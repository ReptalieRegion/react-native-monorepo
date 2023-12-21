import type { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';

/** 공통 */
type Photo = {
    uri: string;
    filename: string;
    width: number;
    height: number;
};

type PageInfo = {
    hasNextPage: boolean;
    startCursor?: string | undefined;
    endCursor?: string | undefined;
};

/** 사진 보관 Context */
type PhotoState = {
    photos: Photo[];
    pageInfo: PageInfo;
    isFeting: boolean;
};

interface AddPhotos {
    type: 'ADD_PHOTOS';
    photoInfo: {
        photos: PhotoIdentifier[];
        pageInfo: PageInfo;
    };
}

interface SavePhotos {
    type: 'SAVE_PHOTOS';
    photo: PhotoIdentifier;
}

type PhotoActions = AddPhotos | SavePhotos;

/** 사진 선택 Context */
type PhotoSelectState = {
    selectedPhotos: Photo[];
    currentSelectedPhoto: Photo | null;
};

interface SetCurrentSelectedPhoto {
    type: 'SET_CURRENT_SELECTED_PHOTO';
    photoIdentifier: PhotoIdentifier;
}

type SelectActionType = 'DELETE' | 'CHANGE_CURRENT_SELECTED_PHOTO' | 'ADD';

interface SelectPhoto {
    type: 'SELECT_PHOTO';
    photo: Photo;
}

interface DeleteSelectPhoto {
    type: 'DELETE_SELECTED_PHOTO';
    uri: string;
}

type PhotoSelectedActions = SelectPhoto | DeleteSelectPhoto | SetCurrentSelectedPhoto;

export type {
    AddPhotos,
    DeleteSelectPhoto,
    PageInfo,
    Photo,
    PhotoActions,
    PhotoSelectState,
    PhotoSelectedActions,
    PhotoState,
    SavePhotos,
    SelectActionType,
    SelectPhoto,
};
