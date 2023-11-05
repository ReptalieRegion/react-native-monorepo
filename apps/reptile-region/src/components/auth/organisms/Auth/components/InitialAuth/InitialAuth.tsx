import { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';

import { useAuth } from '../../hooks/useAuth';

import useRefresh from '@/apis/auth/hooks/mutations/useRefresh';
import { deleteAuthTokens, getRefreshToken } from '@/apis/auth/utils/secure-storage-token';
import { useFetchMeProfile } from '@/apis/me/profile/hooks';
import { useToast } from '@/overlay/Toast';

export default function InitialAuth() {
    const { isSuccess, mutateAsync: refreshMutateAsync } = useRefresh();
    useFetchMeProfile({ enabled: isSuccess });

    const { signIn } = useAuth();
    const { openToast } = useToast();

    useEffect(() => {
        const initSignIn = async () => {
            try {
                const refreshToken = await getRefreshToken();
                if (refreshToken === null) {
                    return;
                }

                const tokens = await refreshMutateAsync({ refreshToken });
                await signIn(tokens);
            } catch (error) {
                openToast({ severity: 'error', contents: '로그인 실패' });
                await deleteAuthTokens();
            } finally {
                await BootSplash.hide({ fade: true });
            }
        };

        initSignIn();
    }, [refreshMutateAsync, openToast, signIn]);

    return null;
}
