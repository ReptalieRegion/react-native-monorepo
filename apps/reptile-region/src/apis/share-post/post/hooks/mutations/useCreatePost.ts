import type { InfiniteData } from '@tanstack/react-query';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { createPost } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { CreatePost, FetchDetailUserPost, FetchPosts } from '@/types/apis/share-post/post';

interface UseCreatePostActions {
    onSuccess(): void;
}

type UseCreatePostProps = UseCreatePostActions;

export default function useCreatePost({ onSuccess }: UseCreatePostProps) {
    const queryClient = useQueryClient();

    return useMutation<CreatePost['Response'], HTTPError, CreatePost['Request']>({
        mutationFn: ({ contents, selectedPhotos }) => createPost({ contents, selectedPhotos }),
        onSuccess: (data) => {
            updateSharePostListCache({ queryClient, data });
            updateSharePostDetailUserListCache({ queryClient, data });
            onSuccess();
        },
        onError: (error) => {
            console.log(error);
        },
    });
}

// 일상공유 무한스크롤 조회 리스트 게시물 추가
function updateSharePostListCache({ queryClient, data }: { queryClient: QueryClient; data: CreatePost['Response'] }) {
    const queryKey = SHARE_POST_QUERY_KEYS.list;
    queryClient.setQueryData<InfiniteData<FetchPosts['Response']>>(queryKey, (prevPostList) => {
        if (prevPostList === undefined) {
            return prevPostList;
        }

        const { pageParams, pages } = prevPostList;

        const updatePages = [...pages];
        updatePages[0] = {
            ...updatePages[0],
            items: [data, ...updatePages[0].items],
        };

        return {
            pageParams,
            pages: updatePages,
        };
    });
}

// 일상공유 무한스크롤 조회 리스트 게시물 추가
function updateSharePostDetailUserListCache({ queryClient, data }: { queryClient: QueryClient; data: CreatePost['Response'] }) {
    const queryKey = SHARE_POST_QUERY_KEYS.detailUserPosts(data.post.user.nickname);
    queryClient.setQueryData<InfiniteData<FetchDetailUserPost['Response']>>(queryKey, (prevDetailUserPostList) => {
        if (prevDetailUserPostList === undefined) {
            return prevDetailUserPostList;
        }

        const { pageParams, pages } = prevDetailUserPostList;
        const updatePages = [...pages];
        updatePages[0] = {
            ...updatePages[0],
            items: [data, ...updatePages[0].items],
        };

        return {
            pageParams,
            pages: updatePages,
        };
    });
}
