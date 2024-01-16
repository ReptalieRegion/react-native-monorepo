import { Alert, Linking, Platform } from 'react-native';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';

export default function photoPermission() {
    return Platform.select({
        ios: async () => {
            const checkResult = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);

            if (checkResult === RESULTS.DENIED) {
                const requestResult = await request(PERMISSIONS.IOS.CAMERA);

                return { isGranted: requestResult === RESULTS.GRANTED, status: requestResult };
            } else if (!(checkResult === RESULTS.GRANTED) && !(checkResult === RESULTS.LIMITED)) {
                Alert.alert('', "사진을 등록하려면\n'사진' 접근권한을 허용해야합니다.", [
                    { text: '취소', style: 'cancel', onPress: () => {} },
                    { text: '설정', onPress: Linking.openSettings },
                ]);

                return { isGranted: false, status: checkResult };
            } else {
                return { isGranted: true, status: checkResult };
            }
        },
        android: async () => {
            const isLegacyVersion = Number(Platform.Version) >= 33;
            if (isLegacyVersion) {
                const requestResult = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
                return { isGranted: requestResult === RESULTS.GRANTED, status: requestResult };
            } else {
                const requestResult = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
                return { isGranted: requestResult === RESULTS.GRANTED, status: requestResult };
            }
        },
    });
}
