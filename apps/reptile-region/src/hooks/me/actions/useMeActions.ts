import { useNavigation, type CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import useSignOut from '@/apis/auth/hooks/mutations/useSignOut';
import useDeleteFCMToken from '@/apis/me/profile/hooks/mutations/useDeleteFCMToken';
import { useToast } from '@/components/@common/organisms/Toast';
import { useAuth } from '@/components/auth/organisms/Auth/hooks/useAuth';
import type { RootRoutesParamList } from '@/types/routes/param-list';
import type { MeBottomTabParamList } from '@/types/routes/param-list/me';

type MyListNavigation = CompositeNavigationProp<
    NativeStackNavigationProp<MeBottomTabParamList, 'bottom-tab/list'>,
    NativeStackNavigationProp<RootRoutesParamList>
>;

const useMeActions = () => {
    const navigation = useNavigation<MyListNavigation>();
    const { signOut } = useAuth();
    const { mutateAsync: signOutMutateAsync } = useSignOut();
    const { mutateAsync: deleteFCMTokenMutateAsync } = useDeleteFCMToken();
    const { openToast } = useToast();

    const logout = async () => {
        try {
            await deleteFCMTokenMutateAsync();
            await signOutMutateAsync();
            await signOut();
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
};

export default useMeActions;
