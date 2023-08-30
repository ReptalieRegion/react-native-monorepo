import { CameraRoll, PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import React, { useCallback, useRef } from 'react';
import { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { shallow } from 'zustand/shallow';

import ImageContent from '../atoms/ImageContent';

import useSharePostWriteStore from '@/stores/share-post/write';
import { photoPermissionCheck } from '@/utils/permissions/photo-permission';

const NUM_COLUMNS = 4;
const LOAD_PHOTO_LIMIT = 40;

const ImageList = () => {
    const { photos, addPhotos, initPhotos } = useSharePostWriteStore(
        (state) => ({
            photos: state.photos,
            addPhotos: state.addPhotos,
            initPhotos: state.initPhotos,
        }),
        shallow,
    );

    const isLoadingMorePhotosRef = useRef<boolean>(false);
    const isLastPhotosRef = useRef<boolean>(false);
    const isFirstRef = useRef<boolean>(false);

    useEffect(() => {
        if (isFirstRef.current) {
            return;
        }

        isFirstRef.current = true;
        const fetchPhotos = async () => {
            try {
                const hasPermission = await photoPermissionCheck();

                if (hasPermission) {
                    const result = await CameraRoll.getPhotos({ first: LOAD_PHOTO_LIMIT, assetType: 'Photos' });
                    initPhotos(result.edges);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchPhotos();
    }, [initPhotos]);

    const loadMorePhotos = async () => {
        if (isLoadingMorePhotosRef.current || isLastPhotosRef.current) {
            return;
        }

        isLoadingMorePhotosRef.current = true;
        CameraRoll.getPhotos({
            first: LOAD_PHOTO_LIMIT,
            after: photos.length > 0 ? photos[photos.length - 1].node.image.uri : undefined,
            assetType: 'Photos',
        })
            .then((result) => {
                if (result.edges.length === 0) {
                    isLastPhotosRef.current = true;
                } else {
                    addPhotos(result.edges);
                }
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                isLoadingMorePhotosRef.current = false;
            });
    };

    const keyExtractor = useCallback((_: PhotoIdentifier, index: number) => index.toString(), []);
    const renderItem = useCallback(
        ({ item, index }: ListRenderItemInfo<PhotoIdentifier>) => (
            <ImageContent numColumns={NUM_COLUMNS} item={item} index={index} />
        ),
        [],
    );

    return (
        <View style={styles.container}>
            <FlashList
                contentContainerStyle={styles.contentContainer}
                data={photos}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                numColumns={NUM_COLUMNS}
                onEndReached={loadMorePhotos}
                onEndReachedThreshold={0.5}
                estimatedItemSize={Dimensions.get('window').width / NUM_COLUMNS - 2}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 16,
    },
});

export default ImageList;
