import { useCameraAlbum } from '@crawl/camera-album';
import { ImageCrop } from '@crawl/image-crop';
import React, { useRef } from 'react';
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

    /**
     * @description 이미지 선택 후 -> 크롭 -> 다른 이미지 -> 이전에 크롭한 이미지 순으로 왔을 때, 이전 position 초기화
     */
    const lastImageUri = useRef(uri);
    const isDifferentImageUri = lastImageUri.current !== uri;
    const initPosition = isDifferentImageUri ? cropInfoMap[uri]?.translation : undefined;
    if (isDifferentImageUri) {
        lastImageUri.current = uri;
    }

    return currentSelectedPhoto ? (
        <ImageCrop
            key={currentSelectedPhoto.uri}
            image={{
                uri,
                width: currentSelectedPhoto.width ?? width,
                height: currentSelectedPhoto.height ?? height,
            }}
            initPosition={initPosition}
            width={props.size.width}
            height={props.size.height}
            minScale={0.5}
            maxScale={3}
            getCropInfo={setCropInfo}
        />
    ) : (
        <View style={props.size} />
    );
}
