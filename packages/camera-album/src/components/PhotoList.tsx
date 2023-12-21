import { FlashList, type ContentStyle, type FlashListProps, type ListRenderItem } from '@shopify/flash-list';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Image, StyleSheet, View, useWindowDimensions, type ImageStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import usePhoto from '../hooks/usePhoto';
import usePhotoHandler from '../hooks/usePhotoHandler';
import usePhotoSelectHandler from '../hooks/usePhotoSelectHandler';
import type { Photo } from '../types';

import PhotoIndicators from './PhotoIndicators';

type PhotoListState = {
    photoFetchOptions: {
        first: number;
    };
    minSelectCount?: number;
    maxSelectCount?: number;
};

interface PhotoListActions {
    onMaxSelectCount?(): void;
    onMinSelectCount?(): void;
}

type PhotoListProps = PhotoListState & PhotoListActions & Pick<FlashListProps<Photo>, 'numColumns'>;

export default function PhotoList({ numColumns = 4, photoFetchOptions = { first: 100 } }: PhotoListProps) {
    const { photos, pageInfo } = usePhoto();
    const { addPhotos } = usePhotoHandler();
    const { setCurrentSelectedPhoto, selectPhoto } = usePhotoSelectHandler();

    const { width } = useWindowDimensions();
    const { bottom } = useSafeAreaInsets();
    const imageWidth = useMemo(() => width / numColumns - 2, [width, numColumns]);
    const itemStyle: ImageStyle = useMemo(() => ({ width: imageWidth, aspectRatio: '1/1' }), [imageWidth]);
    const contentContainerStyle: ContentStyle = useMemo(() => ({ paddingBottom: imageWidth + bottom }), [imageWidth, bottom]);

    useEffect(() => {
        addPhotos({ ...photoFetchOptions, assetType: 'Photos' }).then((photoIdentifiersPage) =>
            setCurrentSelectedPhoto(photoIdentifiersPage.edges[0]),
        );
    }, [photoFetchOptions, addPhotos, setCurrentSelectedPhoto]);

    const handleEndReached = useCallback(() => {
        if (pageInfo.hasNextPage) {
            addPhotos({ ...photoFetchOptions, assetType: 'Photos', after: pageInfo.endCursor });
        }
    }, [pageInfo.hasNextPage, pageInfo.endCursor, photoFetchOptions, addPhotos]);

    const renderItem: ListRenderItem<Photo> = useCallback(
        ({ item }) => {
            const uri = item.uri;

            return (
                <TouchableOpacity activeOpacity={0.5} onPress={() => selectPhoto(item)}>
                    <View style={styles.wrapper}>
                        <Image source={{ uri }} style={itemStyle} />
                        <View style={styles.photoIndicators}>
                            <PhotoIndicators uri={uri} />
                        </View>
                    </View>
                </TouchableOpacity>
            );
        },
        [itemStyle, selectPhoto],
    );

    return (
        <View style={styles.wrapper}>
            <FlashList
                data={photos}
                renderItem={renderItem}
                onEndReached={handleEndReached}
                contentContainerStyle={contentContainerStyle}
                numColumns={numColumns}
                estimatedItemSize={imageWidth}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
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
