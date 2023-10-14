import React, { useReducer } from 'react';
import type { ReactNode } from 'react';

import PhotoEditor from '../components/PhotoEditor';
import PhotoList from '../components/PhotoList';
import { PhotoActionsContext, PhotoStateContext } from '../contexts/PhotoContext';
import { PhotoSelectActionsContext, PhotoSelectStateContext } from '../contexts/PhotoSelectContext';
import photoReducer from '../reducer/photoReducer';
import photoSelectReducer from '../reducer/photoSelectReducer';

type CameraAlbumProps = {
    children: ReactNode;
};

export default function CameraAlbum({ children }: CameraAlbumProps) {
    const [photo, photoDispatch] = useReducer(photoReducer, { photos: [] });
    const [photoSelect, photoSelectDispatch] = useReducer(photoSelectReducer, {
        currentSelectedPhoto: null,
        selectedPhotos: [],
        isLimit: false,
    });

    return (
        <PhotoSelectActionsContext.Provider value={photoSelectDispatch}>
            <PhotoActionsContext.Provider value={photoDispatch}>
                <PhotoSelectStateContext.Provider value={photoSelect}>
                    <PhotoStateContext.Provider value={photo}>{children}</PhotoStateContext.Provider>
                </PhotoSelectStateContext.Provider>
            </PhotoActionsContext.Provider>
        </PhotoSelectActionsContext.Provider>
    );
}

CameraAlbum.PhotoList = PhotoList;
CameraAlbum.PhotoEditor = PhotoEditor;
