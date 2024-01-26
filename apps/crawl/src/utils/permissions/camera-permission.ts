import { Alert, Linking, Platform } from 'react-native';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';

export default function cameraPermission() {
    return Platform.select({
        ios: async () => {
            const checkResult = await check(PERMISSIONS.IOS.CAMERA);

            if (checkResult === RESULTS.DENIED) {
                const requestResult = await request(PERMISSIONS.IOS.CAMERA);
                return requestResult === RESULTS.GRANTED;
            } else if (!(checkResult === RESULTS.GRANTED)) {
                Alert.alert('', "카메라 기능을 사용하려면\n'카메라' 접근권한을 허용해야합니다.", [
                    { text: '취소', style: 'cancel', onPress: () => {} },
                    { text: '설정', onPress: Linking.openSettings },
                ]);

                return false;
            }

            return checkResult === RESULTS.GRANTED;
        },
        android: async () => {
            const permissionsResult = await request(PERMISSIONS.ANDROID.CAMERA);
            return permissionsResult === RESULTS.GRANTED;
        },
    });
}
