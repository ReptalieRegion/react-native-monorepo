import type { InfiniteData, UseMutationOptions } from '@tanstack/react-query';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteComment } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { DeleteComment, FetchComment } from '@/types/apis/share-post/comment';
import type { FetchPosts } from '@/types/apis/share-post/post';

// 댓글 삭제
export default function useBaseDeleteComment(
    props?: Pick<
        UseMutationOptions<DeleteComment['Response'], HTTPError, DeleteComment['Request']>,
        'onMutate' | 'onSettled' | 'onSuccess'
    >,
) {
    const queryClient = useQueryClient();

    return useMutation<DeleteComment['Response'], HTTPError, DeleteComment['Request']>({
        mutationFn: ({ commentId }) => deleteComment({ commentId }),
        ...props,
        onSuccess: (data, variables, context) => {
            deleteCommentCache({ queryClient, data });
            updateSharePostListCache({ queryClient, data });
            props?.onSuccess?.(data, variables, context);
        },
    });
}

// 일상공유 무한스크롤 조회 리스트 댓글 개수 감소
function updateSharePostListCache({ queryClient, data }: { queryClient: QueryClient; data: DeleteComment['Response'] }) {
    const queryKey = SHARE_POST_QUERY_KEYS.list;

    queryClient.setQueryData<InfiniteData<FetchPosts['Response']>>(queryKey, (prevSharePostList) => {
        if (prevSharePostList === undefined) {
            return undefined;
        }

        const { pageParams, pages } = prevSharePostList;

        const updatePages = [...pages].map((page) => {
            const { items, nextPage } = page;
            return {
                nextPage,
                items: items.map((item) => {
                    const isTargetPost = item.post.id === data.post.id;
                    return isTargetPost ? { post: { ...item.post, commentCount: item.post.commentCount - 1 } } : item;
                }),
            };
        });

        return {
            pageParams,
            pages: updatePages,
        };
    });
}

// 특정 게시글 댓글 리스트 무한 스크롤 댓글 삭제
function deleteCommentCache({ queryClient, data }: { queryClient: QueryClient; data: DeleteComment['Response'] }) {
    const queryKey = SHARE_POST_QUERY_KEYS.comment(data.post.id);

    queryClient.setQueryData<InfiniteData<FetchComment['Response']>>(queryKey, (prevCommentList) => {
        if (prevCommentList === undefined) {
            return prevCommentList;
        }

        const { pageParams, pages } = prevCommentList;

        const updatePages = [...pages].map((page) => {
            const { items, nextPage } = page;

            return {
                nextPage,
                items: items.filter((item) => item.comment.id !== data.post.comment.id),
            };
        });

        return {
            pageParams,
            pages: updatePages,
        };
    });
}
