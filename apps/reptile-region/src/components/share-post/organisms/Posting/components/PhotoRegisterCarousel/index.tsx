import type { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import ImageEditor from '@react-native-community/image-editor';
import { color } from '@reptile-region/design-system';
import React, { useEffect } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import Title from '../Title';

import { CancelButton } from '@/assets/icons';
import { ConditionalRenderer } from '@/components/@common/atoms';
import ImagePickerIcon from '@/components/@common/molecules/ImagePickerIcon/ImagePickerIcon';
import { useCameraAlbumHandler, usePhotoSelect } from '@/components/@common/organisms/CameraAlbum';
import { useTagSearch } from '@/components/@common/organisms/TagTextInput';

export default function PhotoRegisterCarousel() {
    const { enabled } = useTagSearch();
    const { deleteSelectedPhoto, setCroppedSelectedPhoto } = useCameraAlbumHandler();
    const { selectedPhotos, croppedSelectedPhotos } = usePhotoSelect();

    useEffect(() => {
        selectedPhotos.forEach(async ({ origin, crop }, index) => {
            let newOrigin: PhotoIdentifier = origin;
            if (crop) {
                const { size, offset } = crop;
                const uri = await ImageEditor.cropImage(origin.node.image.uri, { size, offset });
                newOrigin = { node: { ...origin.node, image: { ...origin.node.image, uri } } };
            }

            setCroppedSelectedPhoto(newOrigin, index);
        });
    }, [selectedPhotos, setCroppedSelectedPhoto]);

    const handelCancelButtonClick = (index: number) => {
        if (selectedPhotos.length === 1) {
            return;
        }

        const photo = selectedPhotos[index];
        if (photo) {
            deleteSelectedPhoto(photo.origin.node.image.uri);
        }
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
                            <ImagePickerIcon currentSize={croppedSelectedPhotos.length} maxSize={5} />
                        </View>
                        {croppedSelectedPhotos.map((item, index) => {
                            return (
                                <View key={index} style={styles.imageContainer}>
                                    <TouchableOpacity
                                        containerStyle={styles.cancelButton}
                                        style={styles.cancelBackground}
                                        onPress={() => handelCancelButtonClick(index)}
                                    >
                                        <CancelButton width={16} height={16} fill={color.White.toString()} />
                                    </TouchableOpacity>
                                    <ConditionalRenderer
                                        condition={item !== null}
                                        trueContent={<Image style={styles.image} source={{ uri: item?.node.image.uri }} />}
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
