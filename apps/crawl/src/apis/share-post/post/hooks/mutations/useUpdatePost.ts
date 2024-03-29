import type { InfiniteData } from '@tanstack/react-query';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { updatePost } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { ME_QUERY_KEYS, SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchDetailUserPost, FetchMePostList, FetchPost, FetchPosts, UpdatePost } from '@/types/apis/share-post/post';

interface UseUpdatePostActions {
    onSuccess(): void;
}

type UseUpdatePostProps = UseUpdatePostActions;

export default function useUpdatePost({ onSuccess }: UseUpdatePostProps) {
    const queryClient = useQueryClient();
    return useMutation<UpdatePost['Response'], HTTPError, UpdatePost['Request']>({
        mutationFn: ({ postId, contents, remainingImages }) => updatePost({ postId, contents, remainingImages }),
        onSuccess: (data) => {
            onSuccess();
            updateSharePostListCache({ queryClient, data });
            updateMePostCache({ queryClient, data });
            updateSharePostDetailUserListCache({ queryClient, data });
            updateSharePostCache({ queryClient, data });
        },
    });
}

// 일상공유 무한스크롤 조회 리스트 게시물 수정
function updateSharePostListCache({ queryClient, data }: { queryClient: QueryClient; data: UpdatePost['Response'] }) {
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
                    const isTargetPost = item.post.id === data.post.id;
                    return isTargetPost
                        ? { post: { ...item.post, images: data.post.images, contents: data.post.contents } }
                        : item;
                }),
            };
        });

        return {
            pageParams,
            pages: updatePages,
        };
    });
}

// 자기 자신 게시물 삭제
function updateMePostCache({ queryClient, data }: { queryClient: QueryClient; data: UpdatePost['Response'] }) {
    const queryKey = ME_QUERY_KEYS.post;

    queryClient.setQueryData<InfiniteData<FetchMePostList['Response']>>(queryKey, (prevPostList) => {
        if (prevPostList === undefined) {
            return prevPostList;
        }

        const { pageParams, pages } = prevPostList;

        const updatePages = [...pages].map((page) => {
            const { items, nextPage } = page;
            return {
                nextPage,
                items: items.map((item) => {
                    const isTargetPost = item.post.id === data.post.id;
                    return isTargetPost
                        ? { post: { ...item.post, images: data.post.images, contents: data.post.contents } }
                        : item;
                }),
            };
        });

        return {
            pageParams,
            pages: updatePages,
        };
    });
}

// 특정 유저의 게시글 리스트 무한 스크롤 게시물 수정
function updateSharePostDetailUserListCache({ queryClient, data }: { queryClient: QueryClient; data: UpdatePost['Response'] }) {
    const queryKey = SHARE_POST_QUERY_KEYS.detailUserPosts(data.post.user.nickname);

    queryClient.setQueryData<InfiniteData<FetchDetailUserPost['Response']>>(queryKey, (prevDetailUserPostList) => {
        if (prevDetailUserPostList === undefined) {
            return prevDetailUserPostList;
        }

        const { pageParams, pages } = prevDetailUserPostList;

        const updatePages = [...pages].map((page) => {
            const { items, nextPage } = page;
            return {
                nextPage,
                items: items.map((item) => {
                    const isTargetPost = item.post.id === data.post.id;
                    return isTargetPost
                        ? { post: { ...item.post, images: data.post.images, contents: data.post.contents } }
                        : item;
                }),
            };
        });

        return {
            pageParams,
            pages: updatePages,
        };
    });
}

function updateSharePostCache({ queryClient, data }: { queryClient: QueryClient; data: UpdatePost['Response'] }) {
    const queryKey = SHARE_POST_QUERY_KEYS.post(data.post.id);

    queryClient.setQueryData<FetchPost['Response']>(queryKey, (prevPost) => {
        if (prevPost === undefined) {
            return prevPost;
        }

        return {
            post: {
                ...prevPost.post,
                images: data.post.images,
                contents: data.post.contents,
            },
        };
    });
}
