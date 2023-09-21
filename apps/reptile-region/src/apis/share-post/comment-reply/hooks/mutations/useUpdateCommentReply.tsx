import { InfiniteData, QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { updateCommentReply } from '../../repository';

import {
    SharePostCommentReplyInfiniteData,
    UpdateCommentReplyRequest,
    UpdateCommentReplyResponse,
} from '<SharePostCommentReplyAPI>';
import { sharePostQueryKeys } from '@/apis/query-keys';

const updateCommentReplyListCache = ({
    queryClient,
    queryKey,
    data,
}: {
    queryClient: QueryClient;
    queryKey: string;
    data: Pick<UpdateCommentReplyResponse, 'commentReply'>;
}) => {
    queryClient.setQueryData<InfiniteData<SharePostCommentReplyInfiniteData>>(
        sharePostQueryKeys.commentReply(queryKey),
        (prevCommentReplyData) => {
            if (prevCommentReplyData === undefined) {
                return prevCommentReplyData;
            }

            const updatePages = [...prevCommentReplyData.pages].map((page) => {
                const items = page.items.map((item) => {
                    if (item.commentReply.id === data.commentReply.id) {
                        return {
                            ...item,
                            commentReply: {
                                ...item.commentReply,
                                contents: data.commentReply.contents,
                                isModified: true,
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
                ...prevCommentReplyData,
                pages: updatePages,
            };
        },
    );
};

const useUpdateCommentReply = () => {
    const queryClient = useQueryClient();
    return useMutation<UpdateCommentReplyResponse, any, UpdateCommentReplyRequest>({
        mutationFn: ({ commentReplyId, contents }) => updateCommentReply({ commentReplyId, contents }),
        onSuccess: (data) => {
            updateCommentReplyListCache({ queryClient, queryKey: data.comment.id, data: { commentReply: data.commentReply } });
        },
    });
};

export default useUpdateCommentReply;
