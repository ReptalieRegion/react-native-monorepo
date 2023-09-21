import { InfiniteData, QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteCommentReply } from '../../repository';

import { SharePostCommentInfiniteData } from '<SharePostCommentAPI>';
import {
    DeleteCommentReplyRequest,
    DeleteCommentReplyResponse,
    SharePostCommentReplyInfiniteData,
} from '<SharePostCommentReplyAPI>';
import { sharePostQueryKeys } from '@/apis/query-keys';

// Cache Update: 특정 게시글 댓글 리스트 무한 스크롤
const updateCommentListCache = ({
    queryClient,
    data,
}: {
    queryClient: QueryClient;
    data: Pick<DeleteCommentReplyResponse, 'post' | 'comment'>;
}) => {
    queryClient.setQueryData<InfiniteData<SharePostCommentInfiniteData>>(
        sharePostQueryKeys.comment(data.post.id),
        (prevCommentData) => {
            if (prevCommentData === undefined) {
                return undefined;
            }

            const updatePages = [...prevCommentData.pages].map((page) => {
                const items = page.items.map((item) => {
                    if (item.comment.id === data.comment.id) {
                        return {
                            ...item,
                            comment: {
                                ...item.comment,
                                replyCount: item.comment.replyCount - 1,
                            },
                        };
                    }

                    return item;
                });

                return { ...page, items };
            });

            return {
                ...prevCommentData,
                pages: updatePages,
            };
        },
    );
};

// 대댓글 리스트 무한스크롤
const deleteCommentReplyListCache = ({
    queryClient,
    data,
}: {
    queryClient: QueryClient;
    data: Pick<DeleteCommentReplyResponse, 'comment' | 'commentReply'>;
}) => {
    queryClient.setQueryData<InfiniteData<SharePostCommentReplyInfiniteData>>(
        sharePostQueryKeys.commentReply(data.comment.id),
        (prevCommentReplyData) => {
            if (prevCommentReplyData === undefined) {
                return prevCommentReplyData;
            }

            const updatePages = [...prevCommentReplyData.pages].map((page) => {
                const items = page.items.filter((item) => item.commentReply.id !== data.commentReply.id);

                return { ...page, items };
            });

            return {
                ...prevCommentReplyData,
                pages: updatePages,
            };
        },
    );
};

const useDeleteCommentReply = () => {
    const queryClient = useQueryClient();
    return useMutation<DeleteCommentReplyResponse, any, DeleteCommentReplyRequest>({
        mutationFn: ({ commentReplyId }) => deleteCommentReply({ commentReplyId }),
        onSuccess: ({ post, comment, commentReply }) => {
            updateCommentListCache({ queryClient, data: { post, comment } });
            deleteCommentReplyListCache({ queryClient, data: { comment, commentReply } });
        },
    });
};

export default useDeleteCommentReply;
