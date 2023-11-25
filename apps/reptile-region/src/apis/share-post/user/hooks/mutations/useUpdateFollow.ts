import type { InfiniteData, UseMutationOptions } from '@tanstack/react-query';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { updateFollow } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchPosts } from '@/types/apis/share-post/post';
import type { FetchDetailUserProfile, UpdateFollow } from '@/types/apis/share-post/user';

type SetQueryDataProps = {
    queryClient: QueryClient;
    data: UpdateFollow['Response'];
};

export type UseCreateFollowProps = Pick<
    UseMutationOptions<UpdateFollow['Response'], HTTPError, UpdateFollow['Request']>,
    'onMutate'
>;

export default function useUpdateFollow({ onMutate }: UseCreateFollowProps) {
    const queryClient = useQueryClient();

    return useMutation<UpdateFollow['Response'], HTTPError, UpdateFollow['Request']>({
        mutationFn: ({ userId }) => updateFollow({ userId }),
        onMutate,
        onSuccess: (data) => {
            updateUserProfile({ queryClient, data });
            updateSharePostList({ queryClient, data });
        },
    });
}

// 특정 유저의 프로필 팔로우 수정
const updateUserProfile = ({ queryClient, data }: SetQueryDataProps) => {
    const queryKey = SHARE_POST_QUERY_KEYS.profile(data.user.nickname);

    queryClient.setQueryData<FetchDetailUserProfile['Response']>(queryKey, (prevUserProfile) => {
        if (prevUserProfile === undefined) {
            return prevUserProfile;
        }

        const { isFollow, followerCount } = prevUserProfile.user;
        const currentIsFollow = !isFollow;
        const currentFollowerCount = isFollow ? followerCount - 1 : followerCount + 1;

        return {
            ...prevUserProfile,
            user: {
                ...prevUserProfile.user,
                isFollow: currentIsFollow,
                followerCount: currentFollowerCount,
            },
        };
    });
};

// 일상공유 무한스크롤 조회 리스트 팔로우 수정
const updateSharePostList = ({ queryClient, data }: SetQueryDataProps) => {
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
                    return isTargetPost
                        ? { post: { ...item.post, user: { ...item.post.user, isFollow: !item.post.user.isFollow } } }
                        : item;
                }),
            };
        });

        return {
            pageParams,
            pages: updatePages,
        };
    });
};
