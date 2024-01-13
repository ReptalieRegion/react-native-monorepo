import type { InfiniteData, UseMutationOptions } from '@tanstack/react-query';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { deletePost } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { ME_QUERY_KEYS, SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { DeletePost, FetchDetailUserPost, FetchMePostList, FetchPosts } from '@/types/apis/share-post/post';

// 사용자의 일상공유 게시물 삭제
export default function useBaseDeletePost<Context = unknown>(
    props?: Pick<
        UseMutationOptions<DeletePost['Response'], HTTPError, DeletePost['Request'], Context>,
        'onSuccess' | 'onError' | 'onMutate' | 'onSettled'
    >,
) {
    const queryClient = useQueryClient();

    return useMutation<DeletePost['Response'], HTTPError, DeletePost['Request'], Context>({
        mutationFn: ({ postId }) => deletePost({ postId }),
        ...props,
        onSuccess: (data, variables, context) => {
            props?.onSuccess?.(data, variables, context);
            deletePostListCache({ queryClient, data });
            deleteMePostCache({ queryClient, data });
            deleteDetailUserPostCache({ queryClient, data });
        },
    });
}

// 일상공유 무한스크롤 조회 리스트 게시글 삭제
function deletePostListCache({ queryClient, data }: { queryClient: QueryClient; data: DeletePost['Response'] }) {
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
                items: items.filter((item) => item.post.id !== data.post.id),
            };
        });

        return {
            pageParams,
            pages: updatePages,
        };
    });
}

// 자기 자신 게시물 삭제
function deleteMePostCache({ queryClient, data }: { queryClient: QueryClient; data: DeletePost['Response'] }) {
    const queryKey = ME_QUERY_KEYS.post;

    queryClient.setQueryData<InfiniteData<FetchMePostList['Response']>>(queryKey, (prevDetailUserPostList) => {
        if (prevDetailUserPostList === undefined) {
            return prevDetailUserPostList;
        }

        const { pageParams, pages } = prevDetailUserPostList;
        const updatePages = [...pages].map((page) => {
            const { items, nextPage } = page;
            return {
                nextPage,
                items: items.filter((item) => item.post.id !== data.post.id),
            };
        });

        return {
            pageParams,
            pages: updatePages,
        };
    });
}

// 특정 유저의 게시글 리스트 무한 스크롤 게시물 삭제
function deleteDetailUserPostCache({ queryClient, data }: { queryClient: QueryClient; data: DeletePost['Response'] }) {
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
                items: items.filter((item) => item.post.id !== data.post.id),
            };
        });

        return {
            pageParams,
            pages: updatePages,
        };
    });
}
