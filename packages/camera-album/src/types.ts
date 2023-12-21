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

interface RefetchPhotos {
    type: 'REFETCH_PHOTOS';
    photoInfo: {
        photos: PhotoIdentifier[];
        pageInfo: PageInfo;
    };
}

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

type PhotoActions = AddPhotos | SavePhotos | RefetchPhotos;

/** 사진 선택 Context */
type PhotoSelectState = {
    selectedPhotos: Photo[];
    currentSelectedPhoto: Photo | null;
    minSelectCount?: number;
    maxSelectCount?: number;
    limitType: 'MIN' | 'MAX' | 'NONE';
};

interface InitSelectedPhoto {
    type: 'INIT_SELECTED_PHOTO';
    photoIdentifier: PhotoIdentifier;
    minSelectCount?: number;
    maxSelectCount?: number;
}

type SelectActionType = 'DELETE' | 'CHANGE_CURRENT_SELECTED_PHOTO' | 'ADD' | 'MIN' | 'MAX';

interface SelectPhoto {
    type: 'SELECT_PHOTO';
    photo: Photo;
}

interface DeleteSelectPhoto {
    type: 'DELETE_SELECTED_PHOTO';
    uri: string;
}

type PhotoSelectedActions = SelectPhoto | DeleteSelectPhoto | InitSelectedPhoto;

export type {
    AddPhotos,
    DeleteSelectPhoto,
    InitSelectedPhoto,
    PageInfo,
    Photo,
    PhotoActions,
    PhotoSelectState,
    PhotoSelectedActions,
    PhotoState,
    RefetchPhotos,
    SavePhotos,
    SelectActionType,
    SelectPhoto,
};
