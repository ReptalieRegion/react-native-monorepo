import type { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { FlashList } from '@shopify/flash-list';
import type { ListRenderItem } from '@shopify/flash-list';
import React, { useEffect } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useCameraAlbumHandler from '../../hooks/useCameraAlbumHandler';
import usePhoto from '../../hooks/usePhoto';
import PhotoIndicators from '../PhotoIndicators';

import SquareImage from '@/components/@common/atoms/SquareImage';
import { MAX_PHOTO_COUNT } from '@/env/constants';
import { useToast } from '@/overlay/Toast';

type PhotoListProps = {
    numColumns: number;
    loadPhotoLimit: number;
};

export default function PhotoList({ numColumns = 4, loadPhotoLimit = 60 }: PhotoListProps) {
    const { width } = useWindowDimensions();
    const imageWidth = width / numColumns - 2;

    const { photos } = usePhoto();
    const { openToast } = useToast();
    const { selectPhoto, loadPhotos, initPhotos } = useCameraAlbumHandler({
        limit: MAX_PHOTO_COUNT,
        limitCallback: () => openToast({ contents: `이미지는 최대 ${MAX_PHOTO_COUNT}개 입니다.`, severity: 'warning' }),
    });

    useEffect(() => {
        initPhotos({ first: loadPhotoLimit });
    }, [initPhotos, loadPhotoLimit]);

    const loadMorePhotos = async () => {
        const lastPhoto = photos?.at(-1)?.node.image.uri;
        await loadPhotos({ first: loadPhotoLimit, after: lastPhoto, assetType: 'Photos' });
    };

    const renderItem: ListRenderItem<PhotoIdentifier> = ({ item }) => {
        const uri = item.node.image.uri;

        const handlePressImage = () => {
            selectPhoto({ photo: item });
        };

        return (
            <TouchableOpacity onPress={handlePressImage} activeOpacity={0.5}>
                <View style={[styles.photoItemContainer, { width: imageWidth, height: imageWidth }]}>
                    <SquareImage image={{ src: uri }} size={imageWidth} />
                    <View style={styles.photoIndicators}>
                        <PhotoIndicators uri={uri} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <FlashList
                data={photos}
                numColumns={numColumns}
                contentContainerStyle={styles.squareContainer}
                keyExtractor={(item) => item.node.image.uri}
                onEndReached={loadMorePhotos}
                renderItem={renderItem}
                estimatedItemSize={imageWidth}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    squareContainer: {
        paddingBottom: 16,
    },
    photoItemContainer: {
        position: 'relative',
        margin: 1,
    },
    photoIndicators: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
});
