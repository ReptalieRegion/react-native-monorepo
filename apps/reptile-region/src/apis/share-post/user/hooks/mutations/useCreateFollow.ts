import type { InfiniteData } from '@tanstack/react-query';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { createFollow } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchPosts } from '@/types/apis/share-post/post';
import type { CreateFollow, FetchDetailUserProfile } from '@/types/apis/share-post/user';

type SetQueryDataProps = {
    queryClient: QueryClient;
    data: CreateFollow['Response'];
};

export default function useCreateFollow() {
    const queryClient = useQueryClient();

    return useMutation<CreateFollow['Response'], HTTPError, CreateFollow['Request']>({
        mutationFn: ({ userId }) => createFollow({ userId }),
        onSuccess: (data) => {
            updateUserProfile({ queryClient, data });
            updateSharePostList({ queryClient, data });
        },
    });
}

// 특정 유저의 프로필 팔로우 생성
function updateUserProfile({ queryClient, data }: SetQueryDataProps) {
    const queryKey = SHARE_POST_QUERY_KEYS.profile(data.user.nickname);

    queryClient.setQueryData<FetchDetailUserProfile['Response']>(queryKey, (prevUserProfile) => {
        if (prevUserProfile === undefined) {
            return prevUserProfile;
        }

        return {
            user: {
                ...prevUserProfile.user,
                isFollow: true,
                followerCount: prevUserProfile.user.followerCount + 1,
            },
        };
    });
}

// 일상공유 무한스크롤 조회 리스트 팔로우 생성
function updateSharePostList({ queryClient, data }: SetQueryDataProps) {
    const queryKey = SHARE_POST_QUERY_KEYS.list;
    queryClient.setQueryData<InfiniteData<FetchPosts['Response']>>(queryKey, (prevPostList) => {
        if (prevPostList === undefined) {
            return prevPostList;
        }

        const { pageParams, pages } = prevPostList;

        const updatePages = [...pages].map((page) => {
            const { items, nextPage } = page;
            return {
                nextPage,
                items: items.map((item) => {
                    const isTargetPost = item.post.user.nickname === data.user.nickname;
                    return isTargetPost ? { post: { ...item.post, user: { ...item.post.user, isFollow: true } } } : item;
                }),
            };
        });

        return {
            pageParams,
            pages: updatePages,
        };
    });
}
