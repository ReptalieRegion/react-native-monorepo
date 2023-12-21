import { CameraRoll, type GetPhotosParams, type SaveToCameraRollOptions } from '@react-native-camera-roll/camera-roll';
import { useCallback, useContext } from 'react';

import { PhotoActionsContext } from '../contexts/PhotoContext';

export default function usePhotoHandler() {
    const dispatch = useContext(PhotoActionsContext);

    if (dispatch === null) {
        throw new Error('Photo Provider를 감싸주세요');
    }

    const addPhotos = useCallback(
        (params: GetPhotosParams) => {
            return CameraRoll.getPhotos(params).then((photo) => {
                dispatch({
                    type: 'ADD_PHOTOS',
                    photoInfo: {
                        photos: photo.edges,
                        pageInfo: {
                            hasNextPage: photo.page_info.has_next_page,
                            endCursor: photo.page_info.end_cursor,
                            startCursor: photo.page_info.start_cursor,
                        },
                    },
                });

                return photo;
            });
        },
        [dispatch],
    );

    const savePhoto = useCallback(
        async ({ tag, options }: { tag: string; options?: SaveToCameraRollOptions | undefined }) => {
            CameraRoll.save(tag, options).then(async () => {
                const photo = await CameraRoll.getPhotos({ first: 1, assetType: 'Photos' });
                dispatch({ type: 'SAVE_PHOTOS', photo: photo.edges[0] });
            });
        },
        [dispatch],
    );

    return {
        addPhotos,
        savePhoto,
    };
}
