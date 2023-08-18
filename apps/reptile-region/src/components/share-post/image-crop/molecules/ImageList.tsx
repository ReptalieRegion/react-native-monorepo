import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { shallow } from 'zustand/shallow';

import useSharePostWriteStore from '../../../../stores/share-post/write';
import { photoPermissionCheck } from '../../../../utils/permissions/photo-permission';
import ImageContent from '../atoms/ImageContent';

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

    return photos.length !== 0 ? (
        <FlatList
            contentContainerStyle={styles.contentContainer}
            data={photos}
            keyExtractor={(_, index) => index.toString()}
            numColumns={NUM_COLUMNS}
            onEndReached={loadMorePhotos}
            onEndReachedThreshold={0.5}
            renderItem={({ item, index }) => <ImageContent numColumns={NUM_COLUMNS} item={item} index={index} />}
        />
    ) : null;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
        paddingBottom: 16,
    },
});

export default ImageList;
