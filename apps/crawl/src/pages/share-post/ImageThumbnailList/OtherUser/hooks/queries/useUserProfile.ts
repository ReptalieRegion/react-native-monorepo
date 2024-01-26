import useFetchUserProfile from '@/apis/share-post/user/hooks/queries/useFetchUserProfile';
import type { ImageType } from '@/types/global/image';

type UseUserProfileAndPostCountProps = {
    nickname: string;
    profile: ImageType;
    isFollow: boolean | undefined;
};

export default function useUserProfile({ nickname, isFollow, profile }: UseUserProfileAndPostCountProps) {
    return useFetchUserProfile({
        nickname,
        initialData: {
            user: {
                id: '',
                isMine: false,
                nickname,
                profile,
                isFollow,
            },
        },
    });
}
