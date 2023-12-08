import type { ListRenderItem } from '@shopify/flash-list';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useCameraAlbumHandler from '../../hooks/useCameraAlbumHandler';
import usePhoto from '../../hooks/usePhoto';
import type { Photo } from '../../types';
import PhotoIndicators from '../PhotoIndicators';

import SquareImage from '@/components/@common/atoms/SquareImage';

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
    const { selectPhoto, fetchPhotos } = useCameraAlbumHandler();
    const isScrolling = useRef(false);

    useEffect(() => {
        fetchPhotos({ first: loadPhotoLimit, isInit: true });
    }, [fetchPhotos, loadPhotoLimit]);

    const loadMorePhotos = () => {
        if (isScrolling.current) {
            fetchPhotos({ first: loadPhotoLimit, after: photos?.at(-1)?.uri, assetType: 'Photos' });
        }
    };

    const renderItem: ListRenderItem<Photo> = useCallback(
        ({ item }) => {
            const { uri } = item;
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
        },
        [imageWidth, selectPhoto],
    );

    return (
        <View style={styles.container}>
            <FlashList
                data={photos}
                numColumns={numColumns}
                contentContainerStyle={{ paddingBottom: imageWidth + bottom }}
                keyExtractor={(item) => item.uri}
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
