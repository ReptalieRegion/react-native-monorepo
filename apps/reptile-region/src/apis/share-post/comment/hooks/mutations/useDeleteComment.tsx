import type { InfiniteData } from '@tanstack/react-query';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteComment } from '../../repository';

import type { DeleteComment, FetchComment } from '<api/share/post/comment>';
import type { FetchPost } from '<api/share/post>';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';

/** 일상공유 무한스크롤 조회 리스트 댓글 개수 감소 **/
const updateSharePostListCache = ({ queryClient, data }: { queryClient: QueryClient; data: DeleteComment['Response'] }) => {
    const queryKey = SHARE_POST_QUERY_KEYS.list;

    queryClient.setQueryData<InfiniteData<FetchPost['Response']>>(queryKey, (prevSharePostList) => {
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
};

/** 특정 게시글 댓글 리스트 무한 스크롤 댓글 삭제 */
const deleteCommentCache = ({ queryClient, data }: { queryClient: QueryClient; data: DeleteComment['Response'] }) => {
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
};

const useDeleteComment = () => {
    const queryClient = useQueryClient();
    return useMutation<DeleteComment['Response'], HTTPError, DeleteComment['Request']>({
        mutationFn: ({ commentId }) => deleteComment({ commentId }),
        onSuccess: (data) => {
            deleteCommentCache({ queryClient, data });
            updateSharePostListCache({ queryClient, data });
        },
    });
};

export default useDeleteComment;
