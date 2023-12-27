import { useQueryClient, type InfiniteData } from '@tanstack/react-query';

import { ME_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useFetchMeProfile from '@/apis/me/profile/hooks/queries/useFetchMeProfile';
import type { FetchMePostList } from '@/types/apis/share-post/post';

export default function useMeProfileAndPostCount() {
    const meProfileQuery = useFetchMeProfile();
    const queryClient = useQueryClient();
    const post = queryClient.getQueryData<InfiniteData<FetchMePostList['Response']>>(ME_QUERY_KEYS.post);

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
