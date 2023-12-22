import { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';

import { useAuth } from '../../hooks/useAuth';

import useAuthCacheInvalidateQueries from '@/apis/@utils/react-query-cache/useAuthCacheInvalidateQueries';
import useRefresh from '@/apis/auth/hooks/mutations/useRefresh';
import { deleteAuthTokens, getRefreshToken } from '@/apis/auth/utils/secure-storage-token';
import useFCM from '@/components/auth/organisms/Auth/hooks/useFCM';
import useToast from '@/components/overlay/Toast/useToast';

export default function InitialAuth() {
    const { initializeFCM } = useFCM();
    const { mutateAsync: refreshMutateAsync } = useRefresh();

    const { invalidateAuthQueries } = useAuthCacheInvalidateQueries();

    const { isSignIn, signIn } = useAuth();
    const openToast = useToast();

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
                openToast({ severity: 'error', contents: '자동 로그인 실패' });
                await deleteAuthTokens();
            } finally {
                await BootSplash.hide({ fade: true });
            }
        };

        initSignIn();
    }, [refreshMutateAsync, openToast, signIn]);

    useEffect(() => {
        if (isSignIn) {
            initializeFCM();
        }
    }, [initializeFCM, isSignIn]);

    useEffect(() => {
        invalidateAuthQueries();
    }, [isSignIn, invalidateAuthQueries]);

    return null;
}
