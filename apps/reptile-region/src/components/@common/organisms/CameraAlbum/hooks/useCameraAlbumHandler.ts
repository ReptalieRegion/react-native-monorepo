import { useCameraRoll, type SaveToCameraRollOptions } from '@react-native-camera-roll/camera-roll';
import { useCallback, useContext, useEffect, useRef } from 'react';

import { PhotoActionsContext } from '../contexts/PhotoContext';
import { PhotoSelectActionsContext } from '../contexts/PhotoSelectContext';
import type { CroppedPhoto, CroppedSelectedPhoto, DeleteSelectedPhoto, FetchPhotosProps, SelectPhoto } from '../types';

export default function useCameraAlbumHandler() {
    const [photos, getPhotos, save] = useCameraRoll();
    const isInitPhoto = useRef<boolean | undefined>();
    const isRetchPhoto = useRef<boolean | undefined>();
    const isSavePhoto = useRef<boolean | undefined>();
    const isLoadingFetchPhoto = useRef(false);

    const photoDispatch = useContext(PhotoActionsContext);
    const photoSelectDispatch = useContext(PhotoSelectActionsContext);

    if (photoDispatch === null || photoSelectDispatch === null) {
        throw new Error('CameraAlbum Provider를 감싸주세요.');
    }

    useEffect(() => {
        if (!photos) {
            return;
        }

        const newPhotos = photos.edges.map((edge) => ({
            uri: edge.node.image.uri,
            name: edge.node.image.filename ?? `image_${Math.floor(Math.random() * 9999)}_${new Date().getTime()}.jpg`,
            width: edge.node.image.width,
            height: edge.node.image.height,
        }));
        const firstEdge = newPhotos[0];

        if (isRetchPhoto.current) {
            photoSelectDispatch({ type: 'REFETCH' });
        }

        if (isInitPhoto.current) {
            photoSelectDispatch({ type: 'INIT_CURRENT_PHOTO', photo: firstEdge });
        }

        if (isSavePhoto.current) {
            photoDispatch({ type: 'SAVE_PHOTO', photo: firstEdge });
            photoSelectDispatch({ type: 'SELECT_PHOTO', photo: firstEdge });
            isSavePhoto.current = false;
        } else {
            photoDispatch({ type: 'ADD_PHOTOS', photos: newPhotos });
        }
    }, [photoDispatch, photoSelectDispatch, photos]);

    const fetchPhotos = useCallback(
        async ({ first, after, assetType, isInit }: FetchPhotosProps) => {
            if (isLoadingFetchPhoto.current) {
                return;
            }

            isLoadingFetchPhoto.current = true;
            isInitPhoto.current = isInit;
            await getPhotos({ first, after, assetType });
            isLoadingFetchPhoto.current = false;
        },
        [getPhotos],
    );

    const selectPhoto = useCallback(
        ({ photo }: Pick<SelectPhoto, 'photo'>) => {
            photoSelectDispatch({ type: 'SELECT_PHOTO', photo });
        },
        [photoSelectDispatch],
    );

    const deleteSelectedPhoto = useCallback(
        ({ uri }: Pick<DeleteSelectedPhoto, 'uri'>) => {
            photoSelectDispatch({ type: 'DELETE_SELECTED_PHOTO', uri });
        },
        [photoSelectDispatch],
    );

    const savePhoto = useCallback(
        async ({ tag, options }: { tag: string; options?: SaveToCameraRollOptions | undefined }) => {
            isSavePhoto.current = true;
            save(tag, options).then(() => getPhotos({ first: 1, assetType: 'Photos' }));
        },
        [getPhotos, save],
    );

    const setCropInfo = useCallback(
        ({ originalUri, crop }: Pick<CroppedPhoto, 'originalUri' | 'crop'>) => {
            photoSelectDispatch({ type: 'CROPPED_PHOTO', originalUri, crop });
        },
        [photoSelectDispatch],
    );

    const setCroppedSelectedPhoto = useCallback(
        ({ croppedSelectedPhoto, index }: Pick<CroppedSelectedPhoto, 'croppedSelectedPhoto' | 'index'>) => {
            photoSelectDispatch({ type: 'CROPPED_SELECT_PHOTO', croppedSelectedPhoto, index });
        },
        [photoSelectDispatch],
    );

    const refetchPhoto = useCallback(
        async ({ first, after, assetType, isInit }: FetchPhotosProps) => {
            isRetchPhoto.current = true;
            fetchPhotos({ first, after, assetType, isInit });
        },
        [fetchPhotos],
    );

    return {
        fetchPhotos,
        selectPhoto,
        deleteSelectedPhoto,
        savePhoto,
        setCropInfo,
        setCroppedSelectedPhoto,
        refetchPhoto,
    };
}
