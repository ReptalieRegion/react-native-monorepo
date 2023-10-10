import { AssetType, CameraRoll } from '@react-native-camera-roll/camera-roll';

import { photoPermissionCheck } from '@/utils/permissions/photo-permission';

export type FetchPhotosProps = {
    first: number;
    after?: string | undefined;
    assetType?: AssetType | undefined;
};

export const fetchPhotos = async ({ first, after, assetType = 'Photos' }: FetchPhotosProps) => {
    try {
        const hasPermission = await photoPermissionCheck();

        if (hasPermission) {
            return await CameraRoll.getPhotos({ first, after, assetType });
        }
    } catch (error) {
        console.error(error);
    }
};
