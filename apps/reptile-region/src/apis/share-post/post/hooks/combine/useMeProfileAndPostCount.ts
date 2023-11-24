import { useQueryClient, type InfiniteData } from '@tanstack/react-query';

import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useFetchMeProfile from '@/apis/me/profile/hooks/queries/useFetchMeProfile';
import type { FetchDetailUserPost } from '@/types/apis/share-post/post';

export default function useMeProfileAndPostCount() {
    const meProfileQuery = useFetchMeProfile();
    const queryClient = useQueryClient();
    const post = queryClient.getQueryData<InfiniteData<FetchDetailUserPost['Response']>>(
        SHARE_POST_QUERY_KEYS.detailUserPosts(meProfileQuery.data?.user.nickname ?? ''),
    );

    const data = {
        user: {
            id: '',
            nickname: '',
            profile: { src: '' },
            isFollow: undefined,
            followerCount: 0,
            followingCount: 0,
            ...meProfileQuery.data?.user,
        },
        postCount: post?.pages.reduce((prev, page) => prev + page.items.length, 0) ?? 0,
    };

    return { ...meProfileQuery, data };
}
