import { TouchableTypo, color } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

import ChangeHeader from './header';

import { CameraAlbum } from '@/components/@common/organisms/CameraAlbum';
import useImageCropActions from '@/hooks/share-post/actions/useImageCropActions';
import type { ImagePickScreenProp } from '@/types/routes/props/share-post/create-post';

export default function ImagePickerPage({ navigation }: ImagePickScreenProp) {
    const { width, height } = useWindowDimensions();
    const textHeight = 48;
    const photoEditorHeight = height / 2;
    const photoListHeight = height - photoEditorHeight;

    return (
        <>
            <ChangeHeader navigation={navigation} />
            <View style={{ width, height: photoEditorHeight }}>
                <CameraAlbum.PhotoEditor width={width} height={photoEditorHeight - textHeight} />
                <CameraAlbumActions height={textHeight} />
            </View>
            <View style={{ height: photoListHeight }}>
                <CameraAlbum.PhotoList numColumns={4} loadPhotoLimit={60} />
            </View>
        </>
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
