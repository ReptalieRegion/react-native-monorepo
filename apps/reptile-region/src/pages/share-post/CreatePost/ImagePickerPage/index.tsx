import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { TouchableTypo } from 'design-system';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { SharePostPostingParamList } from '<routes/root>';
import { createNativeStackHeader } from '@/components/@common/molecules';
import usePhotoSelect from '@/components/@common/organisms/CameraAlbum/hooks/usePhotoSelect';
import CameraAlbum from '@/components/@common/organisms/CameraAlbum/providers/CameraAlbum';

type ImagePickScreenProp = NativeStackScreenProps<SharePostPostingParamList, 'image-crop'>;

type ChangeHeaderProps = {
    navigation: NativeStackNavigationProp<SharePostPostingParamList, 'image-crop'>;
};

const ChangeHeader = ({ navigation }: ChangeHeaderProps) => {
    const { selectedPhotos } = usePhotoSelect();

    useEffect(() => {
        const isValidate = selectedPhotos.length === 0;

        const headerRight = () => {
            const handlePress = () => {
                navigation.navigate('write');
            };

            return (
                <TouchableTypo onPress={handlePress} color={isValidate ? 'placeholder' : 'default'} disabled={isValidate}>
                    다음
                </TouchableTypo>
            );
        };

        navigation.setOptions({ headerRight });
    }, [navigation, selectedPhotos.length]);

    return null;
};

export const ImagePickerHeader = createNativeStackHeader({
    leftIcon: 'cancel',
    title: '사진 등록',
});

export default function ImagePickerPage({ navigation }: ImagePickScreenProp) {
    return (
        <>
            <ChangeHeader navigation={navigation} />
            <CameraAlbum.PhotoEditor />
            <View style={styles.container}>
                <TouchableTypo>최근항목</TouchableTypo>
                <View style={styles.view}>
                    <TouchableTypo>카메라</TouchableTypo>
                </View>
            </View>
            <CameraAlbum.PhotoList numColumns={4} loadPhotoLimit={60} />
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
