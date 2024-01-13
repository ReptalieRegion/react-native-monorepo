import React, { type PropsWithChildren } from 'react';

import { PhotoList } from '../components';

import PhotoProvider from './PhotoProvider';
import PhotoSelectProvider from './PhotoSelectProvider';

export default function CameraAlbum({ children }: PropsWithChildren) {
    return (
        <PhotoProvider>
            <PhotoSelectProvider>{children}</PhotoSelectProvider>
        </PhotoProvider>
    );
}

CameraAlbum.PhotoList = PhotoList;
