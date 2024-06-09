import { CameraView } from 'expo-camera';
import { getAssetsAsync, usePermissions } from 'expo-media-library';
import React, { useCallback, useEffect, useMemo } from 'react';
import {
    StyleSheet,
    Text,
    View,
    _ScrollView,
    useWindowDimensions,
    type ImageStyle,
    type StyleProp,
    type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useShallow } from 'zustand/react/shallow';

import { useGalleryStore } from '../store';
import { chunkArray } from '../utils';

import GalleryImage from './images';

import { FastList } from '@/packages/fast-list';

interface IGallery {
    numColumns?: number;
    gap: number;
}

export default function Gallery({ numColumns = 3, gap = 3 }: IGallery) {
    // styles
    const { width } = useWindowDimensions();
    const { bottom } = useSafeAreaInsets();

    const imageWidth = useMemo(() => width / numColumns, [numColumns, width]);
    const wrapperStyles = useMemo<StyleProp<ViewStyle>>(() => [{ paddingBottom: bottom }, styles.wrapper], [bottom]);
    const gapStyles = useMemo<ViewStyle>(() => ({ gap }), [gap]);
    const renderWrapperStyles = useMemo<StyleProp<ViewStyle>>(() => [styles.rowWrapper, gapStyles], [gapStyles]);
    const imageStyles = useMemo<StyleProp<ImageStyle>>(() => [{ width: imageWidth, height: imageWidth }], [imageWidth]);
    const blurStyles = useMemo(() => [imageStyles, styles.blurWrapper], [imageStyles]);

    // states
    const [permissionResponse, requestPermission] = usePermissions();

    // stores
    const { isLoading, endCursor, hasNextPage, photos, initAssets, setAssets, startLoading } = useGalleryStore(
        useShallow((state) => ({
            isLoading: state.isLoading,
            endCursor: state.endCursor,
            hasNextPage: state.hasNextPage,
            photos: state.photos,
            totalCount: state.totalCount,
            initAssets: state.initAssets,
            setAssets: state.setAssets,
            startLoading: state.startLoading,
        })),
    );

    const newPhotos = useMemo(() => chunkArray(photos, numColumns), [photos, numColumns]);
    const selections = useMemo(() => [1, Math.ceil(photos.length / numColumns) - 1], [photos.length, numColumns]);

    // useEffect
    useEffect(() => {
        const initFetchPhoto = async () => {
            if (permissionResponse?.status !== 'granted') {
                await requestPermission();
            }

            const assetInfo = await getAssetsAsync({
                first: 100,
                mediaType: 'photo',
                sortBy: ['creationTime'],
            });

            initAssets({
                photos: assetInfo.assets,
                endCursor: assetInfo.endCursor,
                hasNextPage: assetInfo.hasNextPage,
                totalCount: assetInfo.totalCount,
            });
        };

        initFetchPhoto();
    }, [permissionResponse?.status, initAssets, requestPermission]);

    // functions
    const fetchPhoto = useCallback(async () => {
        if (!hasNextPage || isLoading) {
            return;
        }

        startLoading();

        const assetInfo = await getAssetsAsync({
            first: 100,
            after: endCursor,
            mediaType: 'photo',
            sortBy: ['creationTime'],
        });

        setAssets({
            photos: assetInfo.assets,
            endCursor: assetInfo.endCursor,
            hasNextPage: assetInfo.hasNextPage,
            totalCount: assetInfo.totalCount,
        });
    }, [endCursor, hasNextPage, isLoading, setAssets, startLoading]);

    const renderRow = useCallback(
        (section: number, row: number) => {
            const isCameraRow = section === 0;
            const items = newPhotos[isCameraRow ? 0 : row + 1] ?? [];

            return (
                <View style={renderWrapperStyles}>
                    {items.map((item, index) => (
                        <GalleryImage
                            key={index}
                            uri={item.uri}
                            imageStyles={imageStyles}
                            blurStyles={blurStyles}
                            imageWidth={imageWidth}
                        />
                    ))}
                </View>
            );
        },
        [blurStyles, imageStyles, imageWidth, newPhotos, renderWrapperStyles],
    );

    return (
        <View style={wrapperStyles}>
            <FastList
                contentContainerStyle={gapStyles}
                sections={selections}
                rowHeight={imageWidth}
                onEndReachedThreshold={0.5}
                renderHeader={() => {
                    return (
                        <View style={renderWrapperStyles}>
                            <CameraView style={imageStyles} />
                        </View>
                    );
                }}
                renderSection={(selection) => {
                    console.log('herer', selection);
                    return (
                        <View style={{ width: 100, height: 100, backgroundColor: 'black' }}>
                            <Text>hihi</Text>
                        </View>
                    );
                }}
                renderRow={renderRow}
                onEndReached={fetchPhoto}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'white',
    },
    rowWrapper: {
        flexDirection: 'row',
    },
    blurWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'lightgray',
    },
});
