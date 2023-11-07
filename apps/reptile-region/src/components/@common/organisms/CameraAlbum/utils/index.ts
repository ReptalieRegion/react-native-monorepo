import { CameraRoll } from '@react-native-camera-roll/camera-roll';

import type { FetchPhotosProps } from '../types';

import { photoPermissionCheck } from '@/utils/permissions/photo-permission';

export const fetchPhotos = async ({ first, after, assetType = 'Photos' }: FetchPhotosProps) => {
    try {
        const hasPermission = await photoPermissionCheck();

        if (hasPermission) {
            return await CameraRoll.getPhotos({ first, after, assetType });
        }

        return undefined;
    } catch (error) {
        return undefined;
    }
};
