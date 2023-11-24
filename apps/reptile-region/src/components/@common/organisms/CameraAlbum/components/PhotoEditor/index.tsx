import React from 'react';
import { View } from 'react-native';

import ImageCrop from '../../../ImageCrop';
import usePhotoSelect from '../../hooks/usePhotoSelect';

type PhotoEditorState = {
    width: number;
    height: number;
};

type PhotoEditorProps = PhotoEditorState;

export default function PhotoEditor({ width, height }: PhotoEditorProps) {
    const { currentSelectedPhoto } = usePhotoSelect();

    if (currentSelectedPhoto === null) {
        return <View style={{ width, height }} />;
    }

    return (
        <ImageCrop
            image={{
                uri: currentSelectedPhoto?.node.image.uri,
                width: currentSelectedPhoto?.node.image.width,
                height: currentSelectedPhoto?.node.image.height,
            }}
            width={width}
            height={height}
            maxScale={3}
            onCropped={({ croppedUri, originalUri }) => {
                console.log(croppedUri, originalUri);
            }}
        />
    );
}
