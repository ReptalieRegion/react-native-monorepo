import { useCameraRoll, type PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { useCallback, useContext, useEffect, useRef } from 'react';

import { PhotoActionsContext } from '../contexts/PhotoContext';
import { PhotoSelectActionsContext } from '../contexts/PhotoSelectContext';
import type { FetchPhotosProps } from '../types';

import usePhotoSelect from './usePhotoSelect';

type UseCameraAlbumHandlerState = {
    limit: number;
};

interface UseCameraAlbumHandlerActions {
    limitCallback(): void;
}

type UseCameraAlbumHandlerProps = UseCameraAlbumHandlerState & UseCameraAlbumHandlerActions;

const useCameraAlbumHandler = (props?: UseCameraAlbumHandlerProps) => {
    const [photos, getPhotos] = useCameraRoll();
    const isInitPhoto = useRef<boolean | undefined>();
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

    useEffect(() => {
        if (!photos) {
            return;
        }

        if (isInitPhoto.current) {
            photoSelectDispatch({ type: 'INIT_CURRENT_PHOTO', photo: photos.edges[0] });
        }

        photoDispatch({ type: 'ADD_PHOTOS', photos: photos.edges });
    }, [photoDispatch, photoSelectDispatch, photos]);

    const fetchPhotos = useCallback(
        async ({ first, after, assetType, isInit }: FetchPhotosProps) => {
            if (isLoadingFetchPhoto.current || isLastPhoto.current) {
                return;
            }

            isLoadingFetchPhoto.current = true;
            isInitPhoto.current = isInit;
            getPhotos({ first, after, assetType });
            isLoadingFetchPhoto.current = false;
        },
        [getPhotos],
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
        fetchPhotos,
        selectPhoto,
        deleteSelectedPhoto,
    };
};

export default useCameraAlbumHandler;
