import { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';

import { useAuth } from '../../hooks/useAuth';

import { refreshToken } from '@/apis/auth/repository';

export default function InitialAuth() {
    const { signIn } = useAuth();

    useEffect(() => {
        const initSignIn = async () => {
            try {
                const tokens = await refreshToken();
                if (tokens?.accessToken && tokens?.refreshToken) {
                    signIn(tokens);
                }
            } catch (error) {
                console.log(error);
            } finally {
                await BootSplash.hide({ fade: true });
            }
        };

        initSignIn();
    }, [signIn]);

    return null;
}
