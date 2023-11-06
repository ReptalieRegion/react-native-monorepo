import React from 'react';
import { useWindowDimensions } from 'react-native';

import ImageCrop from '../../../ImageCrop';
import usePhotoSelect from '../../hooks/usePhotoSelect';

export default function PhotoEditor() {
    const { width, height } = useWindowDimensions();
    const { currentSelectedPhoto } = usePhotoSelect();

    if (!currentSelectedPhoto) {
        return null;
    }

    return (
        <ImageCrop
            image={{
                uri: currentSelectedPhoto.node.image.uri,
                width: currentSelectedPhoto.node.image.width,
                height: currentSelectedPhoto.node.image.height,
            }}
            width={width}
            height={height / 2 - 60}
            maxScale={3}
            onCropped={({ croppedUri, originalUri }) => {
                console.log(croppedUri, originalUri);
            }}
        />
    );
}
