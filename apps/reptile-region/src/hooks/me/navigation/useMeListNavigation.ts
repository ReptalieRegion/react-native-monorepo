import { useNavigation, type CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback } from 'react';

import type { RootRoutesParamList } from '@/types/routes/param-list';
import type { MeBottomTabParamList } from '@/types/routes/param-list/me';

type MeListNavigation = CompositeNavigationProp<
    NativeStackNavigationProp<MeBottomTabParamList, 'bottom-tab/list'>,
    NativeStackNavigationProp<RootRoutesParamList>
>;

export default function useMeListNavigation() {
    const navigation = useNavigation<MeListNavigation>();

    const navigateSharePostMe = useCallback(() => {
        navigation.navigate('share-post/modal', {
            screen: 'modal/image-thumbnail/me',
        });
    }, [navigation]);

    const navigateDiary = useCallback(() => {
        navigation.navigate('diary');
    }, [navigation]);

    const navigateTermsOfUse = useCallback(() => {
        navigation.navigate('me/terms-of-use');
    }, [navigation]);

    const navigatePrivacyPolicy = useCallback(() => {
        navigation.navigate('me/terms-privacy-policy');
    }, [navigation]);

    const navigateProfileSetting = useCallback(() => {
        navigation.navigate('me/profile');
    }, [navigation]);

    const navigateLicense = useCallback(() => {
        navigation.navigate('me/license');
    }, [navigation]);

    const navigateNotificationSetting = useCallback(() => {
        navigation.navigate('me/notification-setting');
    }, [navigation]);

    return {
        navigateSharePostMe,
        navigateDiary,
        navigateTermsOfUse,
        navigatePrivacyPolicy,
        navigateProfileSetting,
        navigateLicense,
        navigateNotificationSetting,
    };
}
