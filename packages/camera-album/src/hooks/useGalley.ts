import { CameraRoll, cameraRollEventEmitter } from '@react-native-camera-roll/camera-roll';
import { useCallback, useContext, useEffect } from 'react';
import { AppState, type EmitterSubscription } from 'react-native';

import { supportedMimeTypesByTheBackEnd } from '../constants/photo';
import { isAboveIOS14, isAndroid } from '../constants/platform';
import { PhotoActionsContext, PhotoStateContext } from '../contexts/PhotoContext';
import { PhotoSelectActionsContext } from '../contexts/PhotoSelectContext';

type GalleryOptions = {
    pageSize: number;
    mimeTypeFilter?: Array<string>;
    minSelectCount?: number;
    maxSelectCount?: number;
};

export const useGallery = ({
    pageSize = 30,
    mimeTypeFilter = supportedMimeTypesByTheBackEnd,
    maxSelectCount,
    minSelectCount,
}: GalleryOptions) => {
    const state = useContext(PhotoStateContext);
    const photoDispatch = useContext(PhotoActionsContext);
    const photoSelectDispatch = useContext(PhotoSelectActionsContext);

    if (state === null || photoDispatch === null || photoSelectDispatch === null) {
        throw new Error('Photo Provider를 감싸주세요');
    }

    const setIsLoading = useCallback(
        (isLoading: boolean) => {
            photoDispatch({ type: 'SET_IS_LOADING', isLoading });
        },
        [photoDispatch],
    );

    const setIsLoadingNextPage = useCallback(
        (isLoading: boolean) => {
            photoDispatch({ type: 'SET_IS_LOADING_NEXT_PAGE', isLoadingNextPage: isLoading });
        },
        [photoDispatch],
    );

    const setIsReloading = useCallback(
        (isReloading: boolean) => {
            photoDispatch({ type: 'SET_IS_RELOADING', isReloading });
        },
        [photoDispatch],
    );

    const loadNextPagePictures = useCallback(async () => {
        const nextCursor = state.pageInfo.endCursor;
        nextCursor ? setIsLoading(true) : setIsLoadingNextPage(true);

        try {
            const { edges, page_info } = await CameraRoll.getPhotos({
                first: pageSize,
                after: nextCursor,
                assetType: 'Photos',
                mimeTypes: mimeTypeFilter,
                ...(isAndroid && { include: ['fileSize', 'filename'] }),
            });

            if (edges.length !== 0) {
                photoDispatch({
                    type: 'ADD_PHOTOS',
                    photoInfo: {
                        photos: edges,
                        pageInfo: {
                            hasNextPage: page_info.has_next_page,
                            endCursor: page_info.end_cursor,
                            startCursor: page_info.start_cursor,
                        },
                    },
                });
            }
        } catch (error) {
            console.error('useGallery getPhotos error:', error);
        } finally {
            setIsLoading(false);
            setIsLoadingNextPage(false);
        }
    }, [setIsLoading, setIsLoadingNextPage, photoDispatch, mimeTypeFilter, pageSize, state.pageInfo.endCursor]);

    const getUnloadedPictures = useCallback(async () => {
        setIsReloading(true);

        try {
            const { edges, page_info } = await CameraRoll.getPhotos({
                first: !state.photos || state.photos.length < pageSize ? pageSize : state.photos.length,
                assetType: 'Photos',
                mimeTypes: mimeTypeFilter,
                ...(isAndroid && { include: ['fileSize', 'filename'] }),
            });

            if (edges.length !== 0) {
                photoDispatch({
                    type: 'REFETCH_PHOTOS',
                    photoInfo: {
                        photos: edges,
                        pageInfo: {
                            hasNextPage: page_info.has_next_page,
                            endCursor: page_info.end_cursor,
                            startCursor: page_info.start_cursor,
                        },
                    },
                });
            }
        } catch (error) {
            console.error('useGallery getNewPhotos error:', error);
        } finally {
            setIsReloading(false);
        }
    }, [mimeTypeFilter, pageSize, state.photos, setIsReloading, photoDispatch]);

    const initSelectedPhoto = useCallback(async () => {
        const { edges } = await CameraRoll.getPhotos({
            first: 1,
            assetType: 'Photos',
            mimeTypes: mimeTypeFilter,
            ...(isAndroid && { include: ['fileSize', 'filename'] }),
        });

        if (edges.length !== 0) {
            photoSelectDispatch({ type: 'INIT_SELECTED_PHOTO', photoIdentifier: edges[0], maxSelectCount, minSelectCount });
        }
    }, [maxSelectCount, mimeTypeFilter, minSelectCount, photoSelectDispatch]);

    useEffect(() => {
        if (state.photos && state.photos.length === 0) {
            initSelectedPhoto();
            loadNextPagePictures();
        }
    }, [initSelectedPhoto, loadNextPagePictures, state.photos]);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', async (nextAppState) => {
            if (nextAppState === 'active') {
                getUnloadedPictures();
            }
        });

        return () => {
            subscription.remove();
        };
    }, [getUnloadedPictures]);

    useEffect(() => {
        let subscription: EmitterSubscription;
        if (isAboveIOS14) {
            subscription = cameraRollEventEmitter.addListener('onLibrarySelectionChange', (_event) => {
                getUnloadedPictures();
            });
        }

        return () => {
            if (isAboveIOS14 && subscription) {
                subscription.remove();
            }
        };
    }, [getUnloadedPictures]);

    return {
        loadNextPagePictures,
        photos: state.photos,
        hasNextPage: state.pageInfo.hasNextPage,
        isLoading: state.isLoading,
        isLoadingNextPage: state.isLoadingNextPage,
        isReloading: state.isReloading,
    };
};
