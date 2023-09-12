import { InfiniteData, QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { updateFollow } from '../../repository';

import { SharePostListInfiniteData } from '<SharePostAPI>';
import type { SharePostUserData, UpdateFollowRequest } from '<SharePostUserAPI>';
import { sharePostQueryKeys } from '@/apis/query-keys';

type SetQueryDataProps = {
    queryClient: QueryClient;
    userId: string;
};

// 유저 프로필 캐시 isFollow, followingCount 변경
const updateUserProfile = ({ queryClient, userId }: SetQueryDataProps) => {
    queryClient.setQueryData<SharePostUserData>(sharePostQueryKeys.profile(userId), (prevUserProfile) => {
        if (prevUserProfile === undefined) {
            return prevUserProfile;
        }

        const { isFollow, followingCount } = prevUserProfile.user;
        const currentIsFollow = !isFollow;
        const currentFollowingCount = isFollow ? followingCount - 1 : followingCount + 1;

        return {
            ...prevUserProfile,
            user: {
                ...prevUserProfile.user,
                isFollow: currentIsFollow,
                followingCount: currentFollowingCount,
            },
        };
    });
};

// 일상 공유 리스트 캐시
const updateSharePostList = ({ queryClient, userId }: SetQueryDataProps) => {
    queryClient.setQueryData<InfiniteData<SharePostListInfiniteData>>(sharePostQueryKeys.list, (prevPostList) => {
        if (prevPostList === undefined) {
            return prevPostList;
        }

        const updatePages = [...prevPostList.pages].map((page) => {
            const items = page.items.map((item) => {
                const user = item.user.id === userId ? { ...item.user, isFollow: !item.user.isFollow } : item.user;
                return { ...item, user };
            });

            return { ...page, items };
        });

        return {
            ...prevPostList,
            pages: updatePages,
        };
    });
};

const onSuccess = (props: SetQueryDataProps) => {
    updateUserProfile(props);
    updateSharePostList(props);
};

const useUpdateFollow = ({ userId }: UpdateFollowRequest) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => updateFollow({ userId }),
        onSuccess: () => onSuccess({ queryClient, userId }),
    });
};

export default useUpdateFollow;
