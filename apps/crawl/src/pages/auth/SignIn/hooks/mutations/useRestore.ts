import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

import useBaseRestore from '@/apis/auth/hooks/mutations/useBaseRestore';
import useGlobalLoading from '@/components/@common/organisms/Loading/useGlobalLoading';
import useToast from '@/components/overlay/Toast/useToast';
import { useAuthHandler } from '@/hooks/auth';
import type { Restore } from '@/types/apis/auth';
import type { SignInNavigationProp } from '@/types/routes/props/auth/sign-in';

export default function useRestore() {
    const openToast = useToast();
    const { signIn } = useAuthHandler();
    const { openLoading, closeLoading } = useGlobalLoading();
    const navigation = useNavigation<SignInNavigationProp>();

    return useBaseRestore({
        onMutate: openLoading,
        onSettled: closeLoading,
        onSuccess: useCallback(
            async (data: Restore['Response']) => {
                await signIn(data);
                navigation.navigate('bottom-tab/routes', {
                    screen: 'tab',
                    params: {
                        screen: 'me/routes',
                        params: {
                            screen: 'bottom-tab/list',
                        },
                    },
                });
            },
            [signIn, navigation],
        ),
        onError: useCallback(() => {
            openToast({ severity: 'error', contents: '회원 복구에 실패했어요. 잠시 후 다시 시도해주세요' });
        }, [openToast]),
    });
}
