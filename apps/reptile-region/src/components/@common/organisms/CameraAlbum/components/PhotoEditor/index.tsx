import React from 'react';
import { View } from 'react-native';

import ImageCrop from '../../../ImageCrop';
import useCameraAlbumHandler from '../../hooks/useCameraAlbumHandler';
import usePhotoSelect from '../../hooks/usePhotoSelect';

type PhotoEditorState = {
    width: number;
    height: number;
};

type PhotoEditorProps = PhotoEditorState;

export default function PhotoEditor({ width, height }: PhotoEditorProps) {
    const { setCropInfo } = useCameraAlbumHandler();
    const { currentSelectedPhoto } = usePhotoSelect();

    if (!currentSelectedPhoto?.origin) {
        return <View style={{ width, height }} />;
    }

    const uri = currentSelectedPhoto.origin.uri;

    return (
        <ImageCrop
            key={currentSelectedPhoto.origin.uri}
            image={{
                uri,
                width: currentSelectedPhoto.origin.width,
                height: currentSelectedPhoto.origin.height,
            }}
            initPosition={
                currentSelectedPhoto.crop
                    ? {
                          x: currentSelectedPhoto.crop.x,
                          y: currentSelectedPhoto.crop.y,
                          scale: currentSelectedPhoto.crop.scale,
                      }
                    : undefined
            }
            width={width}
            height={height}
            minScale={0.5}
            maxScale={3}
            getCropInfo={(originalUri, cropInfo) => setCropInfo({ originalUri, crop: cropInfo })}
        />
    );
}
