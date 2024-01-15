import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';

export const IOS_PERMISSION = {
    camera: PERMISSIONS.IOS.CAMERA,
    photo: PERMISSIONS.IOS.PHOTO_LIBRARY,
} as const;

export const ANDROID_PERMISSION = {
    camera: PERMISSIONS.ANDROID.CAMERA,
    photo: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    legacyPhoto: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
} as const;

export type PermissionsPerIOS = keyof typeof IOS_PERMISSION;

export type PermissionsPerAndroid = keyof typeof ANDROID_PERMISSION;

type PermissionStatus<T extends string[]> = {
    [K in T[number]]?: {
        isGranted: boolean;
        status: 'unavailable' | 'blocked' | 'granted' | 'limited';
    };
};

export const requestIOSPermissions = async <T extends PermissionsPerIOS[]>(
    permissionKeys: PermissionsPerIOS[],
): Promise<PermissionStatus<T>> => {
    const statuses = await Promise.all(
        permissionKeys.map(async (key) => {
            const permission = IOS_PERMISSION[key];
            const checkResult = await check(permission);

            if (checkResult === RESULTS.DENIED) {
                const requestResult = await request(permission);
                return { key, status: requestResult };
            }

            return { key, status: checkResult };
        }),
    );

    return Object.fromEntries(
        statuses.map(({ key, status }) => [
            key,
            {
                isGranted: status === RESULTS.GRANTED,
                status,
            },
        ]),
    ) as PermissionStatus<T>;
};

export const requestAndroidPermissions = async <T extends PermissionsPerAndroid[]>(
    permissionKeys: PermissionsPerAndroid[],
): Promise<PermissionStatus<T>> => {
    const statuses = await Promise.all(
        permissionKeys.map(async (key) => {
            const permission = ANDROID_PERMISSION[key];
            const checkResult = await check(permission);

            if (checkResult === RESULTS.DENIED) {
                const requestResult = await request(permission);
                return { key, status: requestResult };
            }

            return { key, status: checkResult };
        }),
    );

    return Object.fromEntries(
        statuses.map(({ key, status }) => [
            key,
            {
                isGranted: status === RESULTS.GRANTED,
                status,
            },
        ]),
    ) as PermissionStatus<T>;
};
