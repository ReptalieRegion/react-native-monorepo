import { color } from '@crawl/design-system';
import ImageEditor from '@react-native-community/image-editor';
import React, { useEffect } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import Title from '../Title';

import { CancelButton } from '@/assets/icons';
import { ConditionalRenderer } from '@/components/@common/atoms';
import ImagePickerIcon from '@/components/@common/molecules/ImagePickerIcon/ImagePickerIcon';
import { useCameraAlbumHandler, usePhotoSelect } from '@/components/@common/organisms/CameraAlbum';
import type { Photo } from '@/components/@common/organisms/CameraAlbum/types';
import { useTagSearch } from '@/components/@common/organisms/TagTextInput';

export default function PhotoRegisterCarousel() {
    const { enabled } = useTagSearch();
    const { deleteSelectedPhoto, setCroppedSelectedPhoto } = useCameraAlbumHandler();
    const { selectedPhotos, croppedSelectedPhotos } = usePhotoSelect();

    useEffect(() => {
        selectedPhotos.forEach(async ({ origin, crop }, index) => {
            let newOrigin: Photo = origin;
            if (crop) {
                const { size, offset } = crop;
                const uri = await ImageEditor.cropImage(origin.uri, { size, offset });
                newOrigin = {
                    uri,
                    name: origin.name,
                    width: origin.width,
                    height: origin.height,
                };
            }

            setCroppedSelectedPhoto({ croppedSelectedPhoto: newOrigin, index });
        });
    }, [selectedPhotos, setCroppedSelectedPhoto]);

    const handelCancelButtonClick = (index: number) => {
        if (selectedPhotos.length === 1) {
            return;
        }

        const photo = selectedPhotos[index];
        if (photo) {
            deleteSelectedPhoto({ uri: photo.origin.uri });
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
