import { useCallback } from 'react';

import useMeListNavigation from '../useMeListNavigation';

import useBaseSignOut from '@/apis/auth/hooks/mutations/useBaseSignOut';
import useBaseDeleteFCMToken from '@/apis/me/profile/hooks/mutations/useBaseDeleteFCMToken';
import useToast from '@/components/overlay/Toast/useToast';
import { useAuthHandler } from '@/hooks/auth';

export default function useLogout() {
    const openToast = useToast();
    const { signOut } = useAuthHandler();
    const { navigateHomeList } = useMeListNavigation();

    const successSignOutToast = useCallback(() => {
        openToast({ contents: '로그아웃 성공', severity: 'success' });
    }, [openToast]);

    const failSignOutToast = useCallback(() => {
        openToast({ contents: '로그아웃 실패', severity: 'error' });
    }, [openToast]);

    // 로그아웃 - DB Refresh Token 삭제
    const signOutAPI = useBaseSignOut({
        onSuccess: async () => {
            await signOut();
            navigateHomeList();
            successSignOutToast();
        },
        onError: failSignOutToast,
    });

    // FCM Token 삭제
    const deleteFCMTokenAPI = useBaseDeleteFCMToken({
        onSuccess: () => {
            signOutAPI.mutate();
        },
        onError: failSignOutToast,
    });

    return useCallback(() => deleteFCMTokenAPI.mutate(), [deleteFCMTokenAPI]);
}
