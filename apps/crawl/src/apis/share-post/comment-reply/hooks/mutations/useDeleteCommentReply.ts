import type { InfiniteData } from '@tanstack/react-query';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteCommentReply } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchComment } from '@/types/apis/share-post/comment';
import type { DeleteCommentReply, FetchCommentReply } from '@/types/apis/share-post/comment-reply';

// 대댓글 삭제
export default function useDeleteCommentReply() {
    const queryClient = useQueryClient();

    return useMutation<DeleteCommentReply['Response'], HTTPError, DeleteCommentReply['Request']>({
        mutationFn: ({ commentReplyId }) => deleteCommentReply({ commentReplyId }),
        onSuccess: (data) => {
            updateCommentListCache({ queryClient, data });
            deleteCommentReplyListCache({ queryClient, data });
        },
    });
}

// 특정 게시글 댓글 리스트 무한 스크롤 대댓글 개수 감소
function updateCommentListCache({ queryClient, data }: { queryClient: QueryClient; data: DeleteCommentReply['Response'] }) {
    const queryKey = SHARE_POST_QUERY_KEYS.comment(data.post.id);
    queryClient.setQueryData<InfiniteData<FetchComment['Response']>>(queryKey, (prevCommentList) => {
        if (prevCommentList === undefined) {
            return undefined;
        }

        const { pageParams, pages } = prevCommentList;
        const updatePages = [...pages].map((page) => {
            const { items, nextPage } = page;
            return {
                nextPage,
                items: items.map((item) => {
                    const isTargetComment = item.comment.id === data.post.comment.id;
                    return isTargetComment ? { comment: { ...item.comment, replyCount: item.comment.replyCount - 1 } } : item;
                }),
            };
        });

        return {
            pageParams,
            pages: updatePages,
        };
    });
}

// 대댓글 리스트 무한스크롤 대댓글 삭제
function deleteCommentReplyListCache({
    queryClient,
    data,
}: {
    queryClient: QueryClient;
    data: DeleteCommentReply['Response'];
}) {
    const queryKey = data.post.comment.id;
    queryClient.setQueryData<InfiniteData<FetchCommentReply['Response']>>(
        SHARE_POST_QUERY_KEYS.commentReply(queryKey),
        (prevCommentReplyList) => {
            if (prevCommentReplyList === undefined) {
                return prevCommentReplyList;
            }

            const { pageParams, pages } = prevCommentReplyList;

            const updatePages = [...pages].map((page) => {
                const { items, nextPage } = page;

                return {
                    nextPage,
                    items: items.filter((item) => item.commentReply.id !== data.post.comment.commentReply.id),
                };
            });

            return {
                pageParams,
                pages: updatePages,
            };
        },
    );
}
