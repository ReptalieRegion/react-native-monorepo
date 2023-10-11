import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { createContext } from 'react';

export type PhotoSelectState = {
    currentSelectedPhoto: PhotoIdentifier | null;
    selectedPhotos: PhotoIdentifier[];
};

interface SelectPhoto {
    type: 'SELECT_PHOTO';
    photo: PhotoIdentifier;
    selectLimitCount: number;
    limitCallback(): void;
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

export const PhotoSelectStateContext = createContext<PhotoSelectState | null>(null);

export const PhotoSelectActionsContext = createContext<React.Dispatch<PhotoSelectActions> | null>(null);
