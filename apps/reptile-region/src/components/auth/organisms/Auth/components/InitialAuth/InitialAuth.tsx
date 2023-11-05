import { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';

import { useAuth } from '../../hooks/useAuth';

import useRefresh from '@/apis/auth/hooks/mutations/useRefresh';
import { getRefreshToken } from '@/apis/auth/utils/secure-storage-token';
import { useToast } from '@/overlay/Toast';

export default function InitialAuth() {
    const { mutateAsync } = useRefresh();
    const { signIn } = useAuth();
    const { openToast } = useToast();

    useEffect(() => {
        const initSignIn = async () => {
            try {
                const refreshToken = await getRefreshToken();
                if (refreshToken === null) {
                    return;
                }

                const tokens = await mutateAsync({ refreshToken });
                await signIn(tokens);
            } catch (error) {
                openToast({ severity: 'error', contents: '로그인 실패' });
            } finally {
                await BootSplash.hide({ fade: true });
            }
        };

        initSignIn();
    }, [mutateAsync, openToast, signIn]);

    return null;
}
