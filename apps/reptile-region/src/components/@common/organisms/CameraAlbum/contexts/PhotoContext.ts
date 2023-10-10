import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { createContext } from 'react';

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

export const PhotoStateContext = createContext<PhotoState | null>(null);

export const PhotoActionsContext = createContext<React.Dispatch<PhotoActions> | null>(null);
