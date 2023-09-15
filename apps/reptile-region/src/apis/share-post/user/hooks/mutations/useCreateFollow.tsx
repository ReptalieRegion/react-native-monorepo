import { InfiniteData, QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { createFollow } from '../../repository';

import { SharePostListInfiniteData } from '<SharePostAPI>';
import type { CreateFollowRequest, CreateFollowResponse, SharePostUserData } from '<SharePostUserAPI>';
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

        return {
            ...prevUserProfile,
            user: {
                ...prevUserProfile.user,
                isFollow: true,
                followingCount: prevUserProfile.user.followingCount + 1,
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
                const user = item.user.id === userId ? { ...item.user, isFollow: true } : item.user;
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

const useCreateFollow = () => {
    const queryClient = useQueryClient();

    return useMutation<CreateFollowResponse, any, CreateFollowRequest>({
        mutationFn: ({ userId }) => createFollow({ userId }),
        onSuccess: ({ user }) => {
            updateUserProfile({ queryClient, userId: user.id });
            updateSharePostList({ queryClient, userId: user.id });
        },
    });
};

export default useCreateFollow;
