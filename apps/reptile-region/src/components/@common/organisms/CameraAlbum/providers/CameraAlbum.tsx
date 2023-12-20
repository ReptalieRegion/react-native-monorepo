import type { ReactNode } from 'react';
import React, { useEffect, useReducer } from 'react';

import PhotoEditor from '../components/PhotoEditor';
import PhotoList from '../components/PhotoList';
import { initialPhoto, initialPhotoSelect } from '../constants/photo';
import { PhotoActionsContext, PhotoStateContext } from '../contexts/PhotoContext';
import { PhotoSelectActionsContext, PhotoSelectStateContext } from '../contexts/PhotoSelectContext';
import photoReducer from '../reducer/photoReducer';
import photoSelectReducer from '../reducer/photoSelectReducer';

type CameraAlbumState = {
    maxPhotoCount: number;
    children: ReactNode;
};

interface CameraAlbumActions {
    limitCallback(): void;
}

type CameraAlbumProps = CameraAlbumActions & CameraAlbumState;

export default function CameraAlbum({ children, maxPhotoCount, limitCallback }: CameraAlbumProps) {
    const [photo, photoDispatch] = useReducer(photoReducer, initialPhoto);
    const [photoSelect, photoSelectDispatch] = useReducer(photoSelectReducer, { ...initialPhotoSelect, maxPhotoCount });

    useEffect(() => {
        if (photoSelect.isLimit) {
            limitCallback();
            photoSelectDispatch({ type: 'FINISHED_LIMIT_CALLBACK' });
        }
    }, [photoSelect.isLimit, limitCallback]);

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
