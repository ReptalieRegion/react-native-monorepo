import { PhotoList, useCameraAlbum } from '@crawl/camera-album';
import { color } from '@crawl/design-system';
import { ImageCrop } from '@crawl/image-crop';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useCreatePostActions } from '../context/useCreatePostActions';

import ChangeHeader from './header';

import { Album, StrokeCamera } from '@/assets/icons';
import { ConditionalRenderer } from '@/components/@common/atoms';
import useToast from '@/components/overlay/Toast/useToast';
import useImageCropActions from '@/pages/share-post/CreatePost/ImagePickerPage/@hooks/useImageCropActions';
import type { ImagePickScreenProp } from '@/types/routes/props/share-post/create-post';
import { photoPermissionCheck } from '@/utils/permissions/photo-permission';

const MAX_SELECT_COUNT = 5;

export default function ImagePickerPage({ navigation }: ImagePickScreenProp) {
    const openToast = useToast();

    const { width, height } = useWindowDimensions();
    const textHeight = 50;
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

function CameraAlbumActions({ height }: { height: number }) {
    const { handleOpenCamera, handleOpenPhotoPicker } = useImageCropActions();
    const [isLimitedPermission, setIsLimitedPermission] = useState(false);

    useEffect(() => {
        photoPermissionCheck().then((photo) => {
            setIsLimitedPermission(photo?.status === 'limited');
        });
    }, []);

    return (
        <View style={[styles.container, { height: height }]}>
            <ConditionalRenderer
                condition={isLimitedPermission}
                trueContent={
                    <TouchableOpacity onPress={handleOpenPhotoPicker}>
                        <Album width={22} height={22} stroke={color.DarkGray[400].toString()} strokeWidth={1.8} />
                    </TouchableOpacity>
                }
            />
            <TouchableOpacity onPress={handleOpenCamera}>
                <StrokeCamera height={22} stroke={color.DarkGray[400].toString()} strokeWidth={1.8} />
            </TouchableOpacity>
        </View>
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

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: color.White.toString(),
        gap: 30,
    },
});
