import { useCameraAlbum } from '@crawl/camera-album';
import { ImageZoom } from '@crawl/image-crop';
import React from 'react';
import { View } from 'react-native';

import { useCreatePostActions } from '../../@common/context/useCreatePostActions';
import useCreatePostState from '../../@common/context/useCreatePostState';

export default function PhotoEditorView(props: { size: { width: number; height: number } }) {
    const {
        size: { width, height },
    } = props;

    const { cropInfoMap } = useCreatePostState();
    const { setCropInfo } = useCreatePostActions();
    const { currentSelectedPhoto } = useCameraAlbum();
    const uri = currentSelectedPhoto?.uri ?? '';
    const initPosition = cropInfoMap[uri]?.translation;

    return currentSelectedPhoto ? (
        <ImageZoom
            uri={uri}
            minScale={0.6}
            maxScale={3}
            minPanPointers={1}
            containerStyle={props.size}
            initial={initPosition}
            imageStyle={{
                width: currentSelectedPhoto.width ?? width,
                height: currentSelectedPhoto.height ?? height,
            }}
            onInteractionEnd={setCropInfo}
        />
    ) : (
        <View style={props.size} />
    );
}
