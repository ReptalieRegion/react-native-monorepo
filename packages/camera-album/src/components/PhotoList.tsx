import { FlashList, type ContentStyle, type FlashListProps, type ListRenderItem } from '@shopify/flash-list';
import { Image } from 'expo-image';
import React, { useCallback, useEffect, useMemo } from 'react';
import { StyleSheet, View, useWindowDimensions, type ImageStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useGallery } from '../hooks/useGalley';
import usePhotoSelect from '../hooks/usePhotoSelect';
import usePhotoSelectHandler from '../hooks/usePhotoSelectHandler';
import type { Photo } from '../types';

import PhotoIndicators from './PhotoIndicators';

type PhotoListState = {
    pageSize: number;
    minSelectCount?: number;
    maxSelectCount?: number;
};

interface PhotoListActions {
    onMaxSelectCount?(): void;
    onMinSelectCount?(): void;
}

type PhotoListProps = PhotoListState & PhotoListActions & Pick<FlashListProps<Photo>, 'numColumns'>;

export default function PhotoList({
    maxSelectCount,
    minSelectCount,
    onMaxSelectCount,
    onMinSelectCount,
    numColumns = 4,
    pageSize = 96,
}: PhotoListProps) {
    const { photos, hasNextPage, isLoadingNextPage, isLoading, loadNextPagePictures } = useGallery({
        pageSize,
        maxSelectCount,
        minSelectCount,
    });

    const { selectPhoto } = usePhotoSelectHandler();

    const { width } = useWindowDimensions();
    const { bottom } = useSafeAreaInsets();
    const imageWidth = useMemo(() => width / numColumns - 2, [width, numColumns]);
    const itemStyle: ImageStyle = useMemo(() => ({ width: imageWidth, aspectRatio: '1/1' }), [imageWidth]);
    const contentContainerStyle: ContentStyle = useMemo(() => ({ paddingBottom: imageWidth + bottom }), [imageWidth, bottom]);

    const renderItem: ListRenderItem<Photo> = useCallback(
        ({ item }) => {
            const uri = item.uri;

            const handlePressPhoto = () => {
                selectPhoto(item);
            };

            return (
                <TouchableOpacity activeOpacity={0.5} onPress={handlePressPhoto}>
                    <View style={styles.wrapper}>
                        <Image style={itemStyle} recyclingKey={uri} source={{ uri }} priority="high" contentFit="cover" />
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
        <>
            <ChangeLimitType onMaxSelectCount={onMaxSelectCount} onMinSelectCount={onMinSelectCount} />
            <View style={styles.wrapper}>
                <FlashList
                    data={photos}
                    renderItem={renderItem}
                    onEndReached={() => !isLoadingNextPage && !isLoading && hasNextPage && loadNextPagePictures()}
                    contentContainerStyle={contentContainerStyle}
                    numColumns={numColumns}
                    estimatedItemSize={imageWidth}
                />
            </View>
        </>
    );
}

function ChangeLimitType({
    onMaxSelectCount,
    onMinSelectCount,
}: Pick<PhotoListProps, 'onMaxSelectCount' | 'onMinSelectCount'>) {
    const { setNoneLimitType } = usePhotoSelectHandler();
    const { limitType } = usePhotoSelect();

    useEffect(() => {
        if (limitType !== 'NONE') {
            if (limitType === 'MIN') {
                onMinSelectCount?.();
            } else if (limitType === 'MAX') {
                onMaxSelectCount?.();
            }
            setNoneLimitType();
        }
    }, [limitType, onMaxSelectCount, onMinSelectCount, setNoneLimitType]);

    return null;
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
