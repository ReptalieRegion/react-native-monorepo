import React, { useRef } from 'react';
import { photoPermissionCheck } from '@/utils/permissions/photo-permission';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ImageContent from '../atoms/ImageContent';
import imageCropStore from '@/stores/image-crop';

const NUM_COLUMNS = 4;
const LOAD_PHOTO_LIMIT = 40;

const ImageList = () => {
    const photos = imageCropStore((state) => state.photos);
    const addPhotos = imageCropStore((state) => state.addPhotos);
    const initPhotos = imageCropStore((state) => state.initPhotos);

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

    return (
        photos.length !== 0 && (
            <FlatList
                contentContainerStyle={styles.contentContainer}
                data={photos}
                keyExtractor={(_, index) => index.toString()}
                numColumns={NUM_COLUMNS}
                onEndReached={loadMorePhotos}
                onEndReachedThreshold={0.5}
                renderItem={({ item, index }) => <ImageContent numColumns={NUM_COLUMNS} item={item} index={index} />}
            />
        )
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
        paddingBottom: 16, // 필요에 따라 패딩을 조정하세요
    },
});

export default ImageList;
