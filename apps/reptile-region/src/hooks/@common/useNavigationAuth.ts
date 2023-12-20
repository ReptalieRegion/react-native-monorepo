import { useNavigation, type NavigationProp } from '@react-navigation/native';
import { useCallback } from 'react';

import { useAuth } from '@/components/auth/organisms/Auth/hooks/useAuth';
import type { RootRoutesParamList } from '@/types/routes/param-list';

export default function useAuthNavigation() {
    const { isSignIn } = useAuth();

    const navigation = useNavigation<NavigationProp<RootRoutesParamList>>();

    const requireAuthNavigation = useCallback(
        (callback: () => void) => {
            if (!isSignIn) {
                navigation.navigate('sign-in', { successNavigate: 'ME' });
                return;
            }
            callback();
        },
        [isSignIn, navigation],
    );

    return { requireAuthNavigation };
}
