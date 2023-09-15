import { InfiniteData, QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { updateFollow } from '../../repository';

import { SharePostListInfiniteData } from '<SharePostAPI>';
import type { SharePostUserData, UpdateFollowRequest, UpdateFollowResponse } from '<SharePostUserAPI>';
import { sharePostQueryKeys } from '@/apis/query-keys';

type SetQueryDataProps = {
    queryClient: QueryClient;
    userId: string;
};

// Cache Update: 특정 유저의 프로필
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

// Cache Update: 일상공유 무한스크롤 조회 리스트
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

const useUpdateFollow = () => {
    const queryClient = useQueryClient();

    return useMutation<UpdateFollowResponse, any, UpdateFollowRequest>({
        mutationFn: ({ userId }) => updateFollow({ userId }),
        onSuccess: ({ user }) => {
            updateUserProfile({ queryClient, userId: user.id });
            updateSharePostList({ queryClient, userId: user.id });
        },
    });
};

export default useUpdateFollow;
