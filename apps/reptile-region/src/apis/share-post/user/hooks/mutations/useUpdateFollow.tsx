import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';

import { updateFollow } from '../../repository';

import type { FetchDetailUserProfile, UpdateFollow } from '<api/share/post/user>';
import type { FetchPost } from '<api/share/post>';
import { sharePostQueryKeys } from '@/apis/query-keys';

type SetQueryDataProps = {
    queryClient: QueryClient;
    data: UpdateFollow['Response'];
};

/** 특정 유저의 프로필 팔로우 수정 */
const updateUserProfile = ({ queryClient, data }: SetQueryDataProps) => {
    const queryKey = sharePostQueryKeys.profile(data.user.nickname);

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

/** 일상공유 무한스크롤 조회 리스트 팔로우 수정 */
const updateSharePostList = ({ queryClient, data }: SetQueryDataProps) => {
    const queryKey = sharePostQueryKeys.list;
    queryClient.setQueryData<InfiniteData<FetchPost['Response']>>(queryKey, (prevPostList) => {
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

const useUpdateFollow = () => {
    const queryClient = useQueryClient();

    return useMutation<UpdateFollow['Response'], any, UpdateFollow['Request']>({
        mutationFn: ({ userId }) => updateFollow({ userId }),
        onSuccess: (data) => {
            updateUserProfile({ queryClient, data });
            updateSharePostList({ queryClient, data });
        },
    });
};

export default useUpdateFollow;
