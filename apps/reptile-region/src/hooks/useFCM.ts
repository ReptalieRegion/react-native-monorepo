import messaging from '@react-native-firebase/messaging';
import { useCallback } from 'react';

import { useUpdateFCMToken } from '@/apis/me/profile/hooks';
import useCreatePushAgree from '@/apis/notification/push/hooks/mutations/useCreatePushAgree';
const useFCM = () => {
    const { mutate: updateFCMTokenMutate } = useUpdateFCMToken();
    const { mutate: createPushAgreeMutate } = useCreatePushAgree();

    const initializeFCM = useCallback(async () => {
        try {
            const setting = await messaging().requestPermission();
            const hadPermission =
                setting === messaging.AuthorizationStatus.AUTHORIZED || setting === messaging.AuthorizationStatus.PROVISIONAL;
            if (hadPermission) {
                const fcmToken = await messaging().getToken();
                updateFCMTokenMutate({ fcmToken });
            }

            createPushAgreeMutate({ isAgree: hadPermission });
        } catch (error) {
            console.log(error);
        }
    }, [createPushAgreeMutate, updateFCMTokenMutate]);

    return {
        initializeFCM,
    };
};

export default useFCM;
