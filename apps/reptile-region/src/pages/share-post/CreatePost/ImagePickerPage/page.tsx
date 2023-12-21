import { PhotoList, useCameraAlbum } from '@crawl/camera-album';
import { TouchableTypo, color } from '@crawl/design-system';
import { ImageCrop } from '@crawl/image-crop';
import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

import { useCreatePostActions } from '../context/useCreatePostActions';

import ChangeHeader from './header';

import useToast from '@/components/overlay/Toast/useToast';
import useImageCropActions from '@/pages/share-post/CreatePost/ImagePickerPage/@hooks/useImageCropActions';
import type { ImagePickScreenProp } from '@/types/routes/props/share-post/create-post';

const MAX_SELECT_COUNT = 5;

export default function ImagePickerPage({ navigation }: ImagePickScreenProp) {
    const openToast = useToast();
    const { width, height } = useWindowDimensions();
    const textHeight = 48;
    const photoEditorHeight = height / 2;
    const photoListHeight = height - photoEditorHeight;

    return (
        <>
            <ChangeHeader navigation={navigation} />
            <View style={{ width, height: photoEditorHeight }}>
                <PhotoEditorView size={{ width, height: photoEditorHeight - textHeight }} />
                <CameraAlbumActions height={textHeight} />
            </View>
            <View style={{ height: photoListHeight }}>
                <PhotoList
                    photoFetchOptions={{ first: 100 }}
                    maxSelectCount={MAX_SELECT_COUNT}
                    onMaxSelectCount={() => {
                        openToast({ contents: `이미지는 최대 ${MAX_SELECT_COUNT}입니다`, severity: 'warning' });
                    }}
                />
            </View>
        </>
    );
}

function PhotoEditorView(props: { size: { width: number; height: number } }) {
    const {
        size: { width, height },
    } = props;

    const { setCropInfo } = useCreatePostActions();
    const { currentSelectedPhoto } = useCameraAlbum();
    const uri = currentSelectedPhoto?.uri ?? '';

    if (!currentSelectedPhoto) {
        return <View style={props.size} />;
    }

    return (
        <ImageCrop
            key={currentSelectedPhoto?.uri}
            image={{
                uri,
                width: currentSelectedPhoto?.width ?? width,
                height: currentSelectedPhoto?.height ?? height,
            }}
            width={props.size.width}
            height={props.size.height}
            minScale={0.5}
            maxScale={3}
            getCropInfo={setCropInfo}
        />
    );
}

function CameraAlbumActions({ height }: { height: number }) {
    const { handleOpenCamera, handleOpenPhotoPicker } = useImageCropActions();

    return (
        <View style={[styles.container, { height: height }]}>
            <TouchableTypo>최근항목</TouchableTypo>
            <View style={styles.view}>
                <TouchableTypo onPress={handleOpenPhotoPicker}>앨범</TouchableTypo>
                <TouchableTypo onPress={handleOpenCamera}>카메라</TouchableTypo>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: color.White.toString(),
    },
    view: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
});
