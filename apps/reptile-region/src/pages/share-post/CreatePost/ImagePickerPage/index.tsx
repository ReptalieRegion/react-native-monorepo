import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TouchableTypo } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

import ChangeHeader from './header';

import { CameraAlbum } from '@/components/@common/organisms/CameraAlbum';
import type { PostingParamList } from '@/types/routes/param-list/sharePost';

type ImagePickScreenProp = NativeStackScreenProps<PostingParamList, 'image-crop'>;

export default function ImagePickerPage({ navigation }: ImagePickScreenProp) {
    const { width, height } = useWindowDimensions();
    const headerHeight = 60;
    const textHeight = 48;
    const photoEditorHeight = height / 2 - headerHeight;
    const photoListHeight = height - photoEditorHeight;

    return (
        <>
            <ChangeHeader navigation={navigation} />
            <View style={{ width, height: photoEditorHeight }}>
                <CameraAlbum.PhotoEditor width={width} height={photoEditorHeight - textHeight} />
                <View style={[styles.container, { height: textHeight }]}>
                    <TouchableTypo>최근항목</TouchableTypo>
                    <View style={styles.view}>
                        <TouchableTypo>카메라</TouchableTypo>
                    </View>
                </View>
            </View>
            <View style={{ height: photoListHeight }}>
                <CameraAlbum.PhotoList numColumns={4} loadPhotoLimit={60} />
            </View>
        </>
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
    },
    view: {
        display: 'flex',
        flexDirection: 'row',
    },
});
