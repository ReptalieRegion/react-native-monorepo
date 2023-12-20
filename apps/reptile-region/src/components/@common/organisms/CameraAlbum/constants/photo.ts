import type { PhotoSelectState, PhotoState } from '../types';

export const MAX_PHOTO_COUNT = 5;

export const initialPhoto: PhotoState = {
    photos: null,
};

export const initialPhotoSelect: PhotoSelectState = {
    currentSelectedPhoto: null,
    selectedPhotos: [],
    croppedSelectedPhotos: [],
    isLimit: false,
    maxPhotoCount: 0,
};
