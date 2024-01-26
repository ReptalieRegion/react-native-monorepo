import { useNavigation, type CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { RootRoutesParamList } from '@/types/routes/param-list';
import type { MeBottomTabParamList } from '@/types/routes/param-list/me';

type MeListNavigation = CompositeNavigationProp<
    NativeStackNavigationProp<MeBottomTabParamList, 'bottom-tab/list'>,
    NativeStackNavigationProp<RootRoutesParamList>
>;

export default function useMeListNavigation() {
    const navigation = useNavigation<MeListNavigation>();

    const navigateSharePostMe = () => {
        navigation.navigate('share-post/modal', {
            screen: 'modal/image-thumbnail/me',
        });
    };

    const navigateTermsOfUse = () => {
        navigation.navigate('me/terms-of-use');
    };

    const navigateBlockUserList = () => {
        navigation.navigate('me/block-user/list');
    };

    const navigatePrivacyPolicy = () => {
        navigation.navigate('me/terms-privacy-policy');
    };

    const navigateProfileSetting = () => {
        navigation.navigate('me/profile');
    };

    const navigateLicense = () => {
        navigation.navigate('me/license');
    };

    const navigateNotificationSetting = () => {
        navigation.navigate('me/notification-setting');
    };

    const navigateHomeList = () => {
        navigation.navigate('bottom-tab/routes', {
            screen: 'tab',
            params: {
                screen: 'home/routes',
                params: {
                    screen: 'bottom-tab/list',
                },
            },
        });
    };

    const navigateNotice = () => {
        navigation.navigate('me/notice');
    };

    return {
        navigateBlockUserList,
        navigateNotice,
        navigateSharePostMe,
        navigateTermsOfUse,
        navigatePrivacyPolicy,
        navigateProfileSetting,
        navigateLicense,
        navigateNotificationSetting,
        navigateHomeList,
    };
}
