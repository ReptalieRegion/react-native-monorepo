import { useCameraAlbum, useCameraAlbumHandler, type Photo } from '@crawl/camera-album';
import { color } from '@crawl/design-system';
import { cropImage } from '@crawl/image-crop';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { useCreatePostActions } from '../../context/useCreatePostActions';
import useCreatePostState from '../../context/useCreatePostState';

import Title from './Title';

import { CancelButton } from '@/assets/icons';
import { ConditionalRenderer } from '@/components/@common/atoms';
import ImagePickerIcon from '@/components/@common/molecules/ImagePickerIcon/ImagePickerIcon';
import { useTagSearch } from '@/pages/share-post/@common/contexts/TagTextInput';
import type { WritePostNavigationProp } from '@/types/routes/props/share-post/create-post';

export default function PhotoRegisterCarousel() {
    const { enabled } = useTagSearch();
    const { deletePhoto } = useCameraAlbumHandler();
    const { selectedPhotos } = useCameraAlbum();
    const { setCroppedPhoto } = useCreatePostActions();
    const { cropInfoMap, croppedImage } = useCreatePostState();
    const navigation = useNavigation<WritePostNavigationProp>();

    useEffect(() => {
        const croppingImage = async () => {
            let tempCroppedImage: Photo[] = [];

            for (const photo of selectedPhotos) {
                const cropAbleImage = cropInfoMap[photo.uri];
                if (cropAbleImage) {
                    const uri = await cropImage(photo.uri, cropAbleImage);
                    tempCroppedImage.push({ ...photo, uri });
                } else {
                    tempCroppedImage.push({ ...photo });
                }
            }

            return tempCroppedImage;
        };

        croppingImage().then(setCroppedPhoto);
    }, [cropInfoMap, selectedPhotos, setCroppedPhoto]);

    const handelPressCancel = (index: number) => {
        if (selectedPhotos.length === 1) {
            return;
        }

        const photo = selectedPhotos[index];
        if (photo) {
            deletePhoto(photo.uri);
        }
    };

    const navigateImageCrop = () => {
        navigation.navigate('share-post/modal/posting', { screen: 'image-crop' });
    };

    return (
        <ConditionalRenderer
            condition={enabled}
            trueContent={null}
            falseContent={
                <View>
                    <Title title="사진 등록" />
                    <ScrollView contentContainerStyle={styles.container} horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.imageContainer}>
                            <ImagePickerIcon currentSize={croppedImage.length} maxSize={5} onPress={navigateImageCrop} />
                        </View>
                        {croppedImage.map((item, index) => {
                            return (
                                <View key={index} style={styles.imageContainer}>
                                    <TouchableOpacity
                                        containerStyle={styles.cancelButton}
                                        style={styles.cancelBackground}
                                        onPress={() => handelPressCancel(index)}
                                    >
                                        <CancelButton width={16} height={16} fill={color.White.toString()} />
                                    </TouchableOpacity>
                                    <ConditionalRenderer
                                        condition={item !== null}
                                        trueContent={<Image style={styles.image} source={{ uri: item?.uri }} />}
                                        falseContent={<ActivityIndicator />}
                                    />
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>
            }
        />
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 10,
    },
    imageContainer: {
        position: 'relative',
        width: 74,
        height: 74,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButton: {
        position: 'absolute',
        zIndex: 10,
        top: 0,
        right: 0,
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelBackground: {
        backgroundColor: color.DarkGray[500].alpha(0.6).toString(),
        borderRadius: 9999,
    },
    image: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 70,
        height: 70,
        borderRadius: 15,
    },
});
