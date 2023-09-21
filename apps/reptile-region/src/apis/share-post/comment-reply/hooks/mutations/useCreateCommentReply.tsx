import { InfiniteData, QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { createCommentReply } from '../../repository';

import { SharePostCommentInfiniteData } from '<SharePostCommentAPI>';
import {
    CreateCommentReplyRequest,
    CreateCommentReplyResponse,
    SharePostCommentReplyInfiniteData,
} from '<SharePostCommentReplyAPI>';
import { sharePostQueryKeys } from '@/apis/query-keys';

const updateCommentListCache = ({
    queryClient,
    queryKey,
    data,
}: {
    queryClient: QueryClient;
    queryKey: string;
    data: Pick<CreateCommentReplyResponse, 'comment'>;
}) => {
    queryClient.setQueryData<InfiniteData<SharePostCommentInfiniteData>>(
        sharePostQueryKeys.comment(queryKey),
        (prevCommentListData) => {
            if (prevCommentListData === undefined) {
                return prevCommentListData;
            }

            const updatePages = [...prevCommentListData.pages].map((page) => {
                const items = page.items.map((item) => {
                    if (item.comment.id === data.comment.id) {
                        return {
                            ...item,
                            comment: {
                                ...item.comment,
                                replyCount: item.comment.replyCount + 1,
                            },
                        };
                    }

                    return item;
                });

                return {
                    ...page,
                    items,
                };
            });

            return {
                ...prevCommentListData,
                pages: updatePages,
            };
        },
    );
};

const updateCommentReplyListCache = ({
    queryClient,
    queryKey,
    data,
}: {
    queryClient: QueryClient;
    queryKey: string;
    data: Pick<CreateCommentReplyResponse, 'commentReply' | 'user'>;
}) => {
    queryClient.setQueryData<InfiniteData<SharePostCommentReplyInfiniteData>>(
        sharePostQueryKeys.commentReply(queryKey),
        (prevCommentReplyData) => {
            if (prevCommentReplyData === undefined) {
                return prevCommentReplyData;
            }

            const updatePages = [...prevCommentReplyData.pages];
            updatePages[0] = {
                nextPage: updatePages[0].nextPage,
                items: [data, ...updatePages[0].items],
            };

            return {
                ...prevCommentReplyData,
                pages: updatePages,
            };
        },
    );
};

const useCreateCommentReply = () => {
    const queryClient = useQueryClient();
    return useMutation<CreateCommentReplyResponse, any, CreateCommentReplyRequest>({
        mutationFn: ({ commentId, contents }) => createCommentReply({ commentId, contents }),
        onSuccess: (data) => {
            updateCommentListCache({
                queryClient,
                queryKey: data.post.id,
                data: { comment: data.comment },
            });

            updateCommentReplyListCache({
                queryClient,
                queryKey: data.comment.id,
                data: { commentReply: data.commentReply, user: data.user },
            });
        },
    });
};

export default useCreateCommentReply;
