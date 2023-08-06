import { Platform } from 'react-native';

import { requestAndroidPermissions, requestIOSPermissions } from './request-permissions';

const photoPermissionCheckIOS = async () => {
    const permissionsResult = await requestIOSPermissions<['photo']>(['photo']);
    return permissionsResult.photo;
};

const androidPhotoPermissionCheck = async () => {
    const isLegacyVersion = Number(Platform.Version) >= 33;
    if (isLegacyVersion) {
        const permissionsResult = await requestAndroidPermissions<['legacyPhoto']>(['legacyPhoto']);
        return permissionsResult.legacyPhoto;
    }

    const permissionsResult = await requestAndroidPermissions<['photo']>(['photo']);
    return permissionsResult.photo;
};

export const photoPermissionCheck = async () => {
    const hasPermission = Platform.OS === 'ios' ? await photoPermissionCheckIOS() : await androidPhotoPermissionCheck();
    return hasPermission;
};
