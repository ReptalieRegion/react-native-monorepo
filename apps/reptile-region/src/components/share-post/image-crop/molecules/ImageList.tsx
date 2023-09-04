import { CameraRoll, PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import React, { useCallback, useRef } from 'react';
import { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { shallow } from 'zustand/shallow';

import ImageContent from '../atoms/ImageContent';

import usePhotoStore from '@/stores/share-post/usePhotoStore';
import { photoPermissionCheck } from '@/utils/permissions/photo-permission';

const NUM_COLUMNS = 4;
const LOAD_PHOTO_LIMIT = 60;

const ImageList = () => {
    const { photos, addPhotos, initPhotos } = usePhotoStore(
        (state) => ({
            photos: state.photos,
            addPhotos: state.addPhotos,
            initPhotos: state.initPhotos,
        }),
        shallow,
    );

    const onEndReachedCalledDuringMomentum = useRef(true);
    const isLastPhotosRef = useRef<boolean>(false);

    useEffect(() => {
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
        if (isLastPhotosRef.current || onEndReachedCalledDuringMomentum.current) {
            return;
        }

        try {
            const result = await CameraRoll.getPhotos({
                first: LOAD_PHOTO_LIMIT,
                after: photos.length > 0 ? photos[photos.length - 1].node.image.uri : undefined,
                assetType: 'Photos',
            });

            if (result.edges.length === 0) {
                isLastPhotosRef.current = true;
                return;
            }

            addPhotos(result.edges);
        } catch (error) {
            console.error(error);
        } finally {
            onEndReachedCalledDuringMomentum.current = true;
        }
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
                numColumns={NUM_COLUMNS}
                data={photos}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                onEndReached={loadMorePhotos}
                onMomentumScrollBegin={() => (onEndReachedCalledDuringMomentum.current = false)}
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
