import { color } from '@crawl/design-system';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import useImageCropActions from '../hooks/useImageCropActions';

import { Album, StrokeCamera } from '@/assets/icons';
import { ConditionalRenderer } from '@/components/@common/atoms';
import photoPermission from '@/utils/permissions/photo-permission';

export default function CameraAlbumActions({ height }: { height: number }) {
    const { handleOpenCamera, handleOpenPhotoPicker } = useImageCropActions();
    const [isLimitedPermission, setIsLimitedPermission] = useState(false);
    const checkAndRequestPhotoPermission = photoPermission();

    useEffect(() => {
        checkAndRequestPhotoPermission?.().then(({ status }) => {
            setIsLimitedPermission(status === 'limited');
        });
    }, [checkAndRequestPhotoPermission]);

    return (
        <View style={[styles.wrapper, { height }]}>
            <ConditionalRenderer
                condition={isLimitedPermission}
                trueContent={
                    <TouchableOpacity onPress={handleOpenPhotoPicker}>
                        <Album height={22} stroke={color.DarkGray[400].toString()} strokeWidth={1.8} />
                    </TouchableOpacity>
                }
            />
            <TouchableOpacity onPress={handleOpenCamera}>
                <StrokeCamera height={22} stroke={color.DarkGray[400].toString()} strokeWidth={1.8} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: color.White.toString(),
        gap: 30,
        borderTopWidth: 1,
        borderTopColor: color.Gray[200].toString(),
    },
});
