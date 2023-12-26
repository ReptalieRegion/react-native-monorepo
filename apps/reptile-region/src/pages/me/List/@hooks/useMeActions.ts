import useSignOut from '@/apis/auth/hooks/mutations/useSignOut';
import useDeleteFCMToken from '@/apis/me/profile/hooks/mutations/useDeleteFCMToken';
import useToast from '@/components/overlay/Toast/useToast';
import { useAuthHandler } from '@/hooks/auth';

export default function useMeActions() {
    const { signOut } = useAuthHandler();
    const { mutateAsync: signOutMutateAsync } = useSignOut();
    const { mutateAsync: deleteFCMTokenMutateAsync } = useDeleteFCMToken();
    const openToast = useToast();

    const logout = async ({ successCallback }: { successCallback: () => void }) => {
        try {
            await deleteFCMTokenMutateAsync();
            signOutMutateAsync().then(() => {
                signOut();
            });
            successCallback();
            openToast({ contents: '로그아웃 성공', severity: 'success' });
        } catch (error) {
            openToast({ contents: '로그아웃 실패', severity: 'error' });
        }
    };

    return {
        logout,
    };
}
