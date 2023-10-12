import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { useCallback, useContext, useEffect, useRef } from 'react';

import { PhotoActionsContext } from '../contexts/PhotoContext';
import { PhotoSelectActionsContext } from '../contexts/PhotoSelectContext';
import type { FetchPhotosProps } from '../types';
import { fetchPhotos } from '../utils';

import usePhotoSelect from './usePhotoSelect';

type UseCameraAlbumHandlerState = {
    limit: number;
};

interface UseCameraAlbumHandlerActions {
    limitCallback(): void;
}

type UseCameraAlbumHandlerProps = UseCameraAlbumHandlerState & UseCameraAlbumHandlerActions;

const useCameraAlbumHandler = (props?: UseCameraAlbumHandlerProps) => {
    const isLastPhoto = useRef(false);
    const isLoadingFetchPhoto = useRef(false);

    const { isLimit } = usePhotoSelect();
    const photoDispatch = useContext(PhotoActionsContext);
    const photoSelectDispatch = useContext(PhotoSelectActionsContext);

    if (photoDispatch === null || photoSelectDispatch === null) {
        throw new Error('CameraAlbum Provider를 감싸주세요.');
    }

    useEffect(() => {
        if (!!props && isLimit) {
            props.limitCallback();
        }
    }, [props, isLimit]);

    const initPhotos = useCallback(
        async ({ first, after, assetType }: FetchPhotosProps) => {
            if (isLoadingFetchPhoto.current || isLastPhoto.current) {
                return;
            }

            isLoadingFetchPhoto.current = true;
            const result = await fetchPhotos({ first, after, assetType });
            const photos = result ? result.edges : null;
            photoDispatch({ type: 'INIT_PHOTOS', photos });
            photoSelectDispatch({ type: 'INIT_CURRENT_PHOTO', photo: photos !== null ? photos[0] : null });
            isLoadingFetchPhoto.current = false;
        },
        [photoDispatch, photoSelectDispatch],
    );

    const loadPhotos = useCallback(
        async ({ first, after, assetType }: FetchPhotosProps) => {
            if (isLoadingFetchPhoto.current || isLastPhoto.current) {
                return;
            }

            isLoadingFetchPhoto.current = true;
            const result = await fetchPhotos({ first, after, assetType });
            isLastPhoto.current = result?.edges.length === 0;
            const photos = result ? result.edges : null;
            photoDispatch({ type: 'ADD_PHOTOS', photos });
            isLoadingFetchPhoto.current = false;
        },
        [photoDispatch],
    );

    const selectPhoto = useCallback(
        ({ photo }: { photo: PhotoIdentifier }) => {
            photoSelectDispatch({ type: 'SELECT_PHOTO', photo, limit: props?.limit });
        },
        [photoSelectDispatch, props?.limit],
    );

    const deleteSelectedPhoto = useCallback(
        (uri: string) => {
            photoSelectDispatch({ type: 'DELETE_SELECTED_PHOTO', uri });
        },
        [photoSelectDispatch],
    );

    return {
        initPhotos,
        loadPhotos,
        selectPhoto,
        deleteSelectedPhoto,
    };
};

export default useCameraAlbumHandler;
