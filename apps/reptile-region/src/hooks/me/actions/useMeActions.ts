import { useNavigation } from '@react-navigation/native';

import useSignOut from '@/apis/auth/hooks/mutations/useSignOut';
import useDeleteFCMToken from '@/apis/me/profile/hooks/mutations/useDeleteFCMToken';
import { useToast } from '@/components/@common/organisms/Toast';
import { useAuth } from '@/components/auth/organisms/Auth/hooks/useAuth';
import type { MyListNavigation } from '@/types/routes/props/me/me-list';

export default function useMeActions() {
    const navigation = useNavigation<MyListNavigation>();
    const { signOut } = useAuth();
    const { mutateAsync: signOutMutateAsync } = useSignOut();
    const { mutateAsync: deleteFCMTokenMutateAsync } = useDeleteFCMToken();
    const { openToast } = useToast();

    const logout = async () => {
        try {
            await deleteFCMTokenMutateAsync();
            signOutMutateAsync().then(() => {
                signOut();
            });
            navigation.navigate('bottom-tab/routes', {
                screen: 'tab',
                params: {
                    screen: 'home/routes',
                    params: {
                        screen: 'bottom-tab/list',
                    },
                },
            });
            openToast({ contents: '로그아웃 성공', severity: 'success' });
        } catch (error) {
            openToast({ contents: '로그아웃 실패', severity: 'error' });
        }
    };

    return {
        logout,
    };
}
