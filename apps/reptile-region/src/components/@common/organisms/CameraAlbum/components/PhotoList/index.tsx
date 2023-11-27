import { type PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import type { ListRenderItem } from '@shopify/flash-list';
import { FlashList } from '@shopify/flash-list';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MAX_PHOTO_COUNT } from '../../constants/photo';
import useCameraAlbumHandler from '../../hooks/useCameraAlbumHandler';
import usePhoto from '../../hooks/usePhoto';
import PhotoIndicators from '../PhotoIndicators';

import SquareImage from '@/components/@common/atoms/SquareImage';
import { useToast } from '@/components/@common/organisms/Toast';

type PhotoListState = {
    numColumns: number;
    loadPhotoLimit: number;
};

type PhotoListProps = PhotoListState;

export default function PhotoList({ numColumns = 4, loadPhotoLimit = 60 }: PhotoListProps) {
    const { bottom } = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const imageWidth = width / numColumns - 2;

    const { photos } = usePhoto();
    const { openToast } = useToast();
    const { selectPhoto, fetchPhotos } = useCameraAlbumHandler({
        limit: MAX_PHOTO_COUNT,
        limitCallback: () => openToast({ contents: `이미지는 최대 ${MAX_PHOTO_COUNT}개 입니다.`, severity: 'warning' }),
    });
    const isScrolling = useRef(false);

    useEffect(() => {
        fetchPhotos({ first: loadPhotoLimit, isInit: true });
    }, [fetchPhotos, loadPhotoLimit]);

    const loadMorePhotos = () => {
        if (isScrolling.current) {
            const lastPhoto = photos?.at(-1)?.node.image.uri;
            fetchPhotos({ first: loadPhotoLimit, after: lastPhoto, assetType: 'Photos' });
        }
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
                contentContainerStyle={{ paddingBottom: imageWidth + bottom }}
                keyExtractor={(item) => item.node.image.uri}
                onEndReached={loadMorePhotos}
                renderItem={renderItem}
                estimatedItemSize={imageWidth}
                onMomentumScrollBegin={() => (isScrolling.current = true)}
                onMomentumScrollEnd={() => (isScrolling.current = false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
