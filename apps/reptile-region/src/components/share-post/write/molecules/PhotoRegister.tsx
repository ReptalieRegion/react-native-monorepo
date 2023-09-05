import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { shallow } from 'zustand/shallow';

import SharePostWriteTitle from '../atoms/SharePostWriteTitle';

import { CancelButton } from '@/assets/icons';
import { color } from '@/components/common/tokens/colors';
import usePhotoStore from '@/stores/share-post/usePhotoStore';
import useUserTaggingStore from '@/stores/share-post/useUserTaggingStore';

const PhotoRegister = () => {
    const { taggingInfo } = useUserTaggingStore();
    const { selectedPhotos, deleteSelectedPhoto } = usePhotoStore(
        (state) => ({
            selectedPhotos: state.selectedPhotos,
            deleteSelectedPhoto: state.deleteSelectedPhoto,
        }),
        shallow,
    );

    const handelCancelButtonClick = (index: number) => {
        if (selectedPhotos.length === 1) {
            return;
        }

        const photo = selectedPhotos[index];
        if (photo) {
            deleteSelectedPhoto(photo.node.image.uri);
        }
    };

    if (taggingInfo.keyword !== undefined) {
        return null;
    }

    return (
        <View>
            <SharePostWriteTitle title="사진 등록" />
            <ScrollView contentContainerStyle={styles.container} horizontal showsHorizontalScrollIndicator={false}>
                {selectedPhotos.map((item, index) => (
                    <View key={index} style={styles.imageContainer}>
                        <TouchableOpacity
                            containerStyle={styles.cancelButton}
                            style={styles.cancelBackground}
                            onPress={() => handelCancelButtonClick(index)}
                        >
                            <CancelButton width={16} height={16} fill={color.White.toString()} />
                        </TouchableOpacity>
                        <Image style={styles.image} source={{ uri: item.node.image.uri }} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 10,
    },
    imageContainer: {
        position: 'relative',
        width: 74,
        height: 74,
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
        backgroundColor: color.Black.alpha(0.6).toString(),
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

export default PhotoRegister;
