import { CameraAlbum, PhotoList } from '@crawl/camera-album';
import React from 'react';

export default function CameraAlbumPage() {
    return (
        <CameraAlbum>
            <PhotoList pageSize={96} />
        </CameraAlbum>
    );
}
