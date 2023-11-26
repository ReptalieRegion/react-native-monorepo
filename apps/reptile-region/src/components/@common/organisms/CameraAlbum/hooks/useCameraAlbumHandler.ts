import { useCameraRoll, type PhotoIdentifier, type SaveToCameraRollOptions } from '@react-native-camera-roll/camera-roll';
import { useCallback, useContext, useEffect, useRef } from 'react';

import { PhotoActionsContext } from '../contexts/PhotoContext';
import { PhotoSelectActionsContext } from '../contexts/PhotoSelectContext';
import type { CropInfo, FetchPhotosProps } from '../types';

import usePhotoSelect from './usePhotoSelect';

type UseCameraAlbumHandlerState = {
    limit: number;
};

interface UseCameraAlbumHandlerActions {
    limitCallback(): void;
}

type UseCameraAlbumHandlerProps = UseCameraAlbumHandlerState & UseCameraAlbumHandlerActions;

export default function useCameraAlbumHandler(props?: UseCameraAlbumHandlerProps) {
    const [photos, getPhotos, save] = useCameraRoll();
    const isInitPhoto = useRef<boolean | undefined>();
    const isSavePhoto = useRef<boolean | undefined>();
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

        const firstEdge = photos.edges[0];

        if (isInitPhoto.current) {
            photoSelectDispatch({ type: 'INIT_CURRENT_PHOTO', photo: firstEdge });
        }

        if (isSavePhoto.current) {
            photoDispatch({ type: 'SAVE_PHOTO', photo: firstEdge });
            photoSelectDispatch({ type: 'SELECT_PHOTO', photo: firstEdge, limit: props?.limit });
            isSavePhoto.current = false;
        } else {
            photoDispatch({ type: 'ADD_PHOTOS', photos: photos.edges });
        }
    }, [photoDispatch, photoSelectDispatch, photos, props?.limit]);

    const fetchPhotos = useCallback(
        async ({ first, after, assetType, isInit }: FetchPhotosProps) => {
            if (isLoadingFetchPhoto.current) {
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

    const savePhoto = useCallback(
        async ({ tag, options }: { tag: string; options?: SaveToCameraRollOptions | undefined }) => {
            isSavePhoto.current = true;
            save(tag, options).then(() => getPhotos({ first: 1, assetType: 'Photos' }));
        },
        [getPhotos, save],
    );

    const setCropInfo = useCallback(
        ({ originalUri, crop }: { originalUri: string; crop?: CropInfo }) => {
            photoSelectDispatch({ type: 'CROPPED_PHOTO', originalUri, crop });
        },
        [photoSelectDispatch],
    );

    const setCroppedSelectedPhoto = useCallback(
        (croppedSelectedPhoto: PhotoIdentifier, index: number) => {
            photoSelectDispatch({ type: 'CROPPED_SELECT_PHOTO', croppedSelectedPhoto, index });
        },
        [photoSelectDispatch],
    );

    return {
        fetchPhotos,
        selectPhoto,
        deleteSelectedPhoto,
        savePhoto,
        setCropInfo,
        setCroppedSelectedPhoto,
    };
}
