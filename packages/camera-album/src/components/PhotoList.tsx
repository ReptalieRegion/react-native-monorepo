import { FlashList, type ContentStyle, type FlashListProps, type ListRenderItem } from '@shopify/flash-list';
import { Image } from 'expo-image';
import React, { useCallback, useEffect, useMemo } from 'react';
import { StyleSheet, View, useWindowDimensions, type ImageStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import usePhoto from '../hooks/usePhoto';
import usePhotoHandler from '../hooks/usePhotoHandler';
import usePhotoSelect from '../hooks/usePhotoSelect';
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

export default function PhotoList({
    maxSelectCount,
    minSelectCount,
    onMaxSelectCount,
    onMinSelectCount,
    numColumns = 4,
    photoFetchOptions = { first: 100 },
}: PhotoListProps) {
    const { photos, pageInfo } = usePhoto();
    const { addPhotos } = usePhotoHandler();

    const { initSelectedPhoto, selectPhoto } = usePhotoSelectHandler();

    const { width } = useWindowDimensions();
    const { bottom } = useSafeAreaInsets();
    const imageWidth = useMemo(() => width / numColumns - 2, [width, numColumns]);
    const itemStyle: ImageStyle = useMemo(() => ({ width: imageWidth, aspectRatio: '1/1' }), [imageWidth]);
    const contentContainerStyle: ContentStyle = useMemo(() => ({ paddingBottom: imageWidth + bottom }), [imageWidth, bottom]);

    useEffect(() => {
        addPhotos({ ...photoFetchOptions, assetType: 'Photos' }).then((photoIdentifiersPage) =>
            initSelectedPhoto({
                photoIdentifier: photoIdentifiersPage.edges[0],
                minSelectCount,
                maxSelectCount,
            }),
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEndReached = useCallback(() => {
        if (pageInfo.hasNextPage) {
            addPhotos({ ...photoFetchOptions, assetType: 'Photos', after: pageInfo.endCursor });
        }
    }, [pageInfo.hasNextPage, pageInfo.endCursor, photoFetchOptions, addPhotos]);

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
                    onEndReached={handleEndReached}
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
    const { limitType } = usePhotoSelect();

    useEffect(() => {
        if (limitType === 'MIN') {
            onMinSelectCount?.();
        } else if (limitType === 'MAX') {
            onMaxSelectCount?.();
        }
    }, [limitType, onMaxSelectCount, onMinSelectCount]);

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
