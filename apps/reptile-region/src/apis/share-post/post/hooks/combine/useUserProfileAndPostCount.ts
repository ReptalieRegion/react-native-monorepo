import { useQueryClient, type InfiniteData } from '@tanstack/react-query';

import type { ImageType } from '<image>';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useFetchUserProfile from '@/apis/share-post/user/hooks/queries/useFetchUserProfile';
import type { FetchDetailUserPost } from '@/types/apis/share-post/post';

type UseUserProfileAndPostCountProps = {
    nickname: string;
    profile: ImageType;
    isFollow: boolean | undefined;
};

export default function useUserProfileAndPostCount({ nickname, isFollow, profile }: UseUserProfileAndPostCountProps) {
    const profileQuery = useFetchUserProfile({ nickname });
    const queryClient = useQueryClient();
    const post = queryClient.getQueryData<InfiniteData<FetchDetailUserPost['Response']>>(
        SHARE_POST_QUERY_KEYS.detailUserPosts(nickname),
    );

    const data = {
        user: {
            id: '',
            nickname,
            profile,
            isFollow,
            followerCount: 0,
            followingCount: 0,
            ...profileQuery.data?.user,
        },
        postCount: post?.pages.reduce((prev, page) => prev + page.items.length, 0) ?? 0,
    };

    return { ...profileQuery, data };
}