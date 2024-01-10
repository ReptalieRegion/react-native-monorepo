import { useNavigation } from '@react-navigation/native';

import useBaseWithdrawal from '@/apis/auth/hooks/mutations/useBaseWithdrawal';
import useGlobalLoading from '@/components/@common/organisms/Loading/useGlobalLoading';
import useToast from '@/components/overlay/Toast/useToast';
import { useAuthHandler } from '@/hooks/auth';
import type { ProfileSettingNavigation } from '@/types/routes/props/me/profile-setting';

export default function useWithdrawal() {
    const openToast = useToast();
    const { openLoading, closeLoading } = useGlobalLoading();
    const { signOut } = useAuthHandler();
    const navigation = useNavigation<ProfileSettingNavigation>();

    return useBaseWithdrawal({
        onMutate: openLoading,
        onSettled: closeLoading,
        onSuccess: async () => {
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
        },
        onError: () => {
            openToast({ severity: 'error', contents: '회원탈퇴에 실패했어요. 잠시후 다시 시도해주세요' });
        },
    });
}
