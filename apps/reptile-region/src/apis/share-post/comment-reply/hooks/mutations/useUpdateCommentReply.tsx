import { InfiniteData, QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { updateCommentReply } from '../../repository';

import type { FetchCommentReply, UpdateCommentReply } from '<api/share/post/comment-reply>';
import { OnSuccessParam } from '<api/utils>';
import { sharePostQueryKeys } from '@/apis/query-keys';

/** 대댓글 리스트 무한스크롤 대댓글 수정 */
const updateCommentReplyListCache = ({
    queryClient,
    data,
}: {
    queryClient: QueryClient;
    data: UpdateCommentReply['Response'];
}) => {
    const queryKey = sharePostQueryKeys.commentReply(data.comment.id);

    queryClient.setQueryData<InfiniteData<FetchCommentReply['Response']>>(queryKey, (prevCommentReplyList) => {
        if (prevCommentReplyList === undefined) {
            return prevCommentReplyList;
        }

        const { pageParams, pages } = prevCommentReplyList;
        const updatePages = [...pages].map((page) => {
            const { nextPage, items } = page;
            return {
                nextPage,
                items: items.map((item) => {
                    const isTargetCommentReply = item.commentReply.id === data.comment.commentReply.id;
                    return isTargetCommentReply
                        ? { commentReply: { ...item.commentReply, ...data.comment.commentReply, isModified: true } }
                        : item;
                }),
            };
        });

        return {
            pageParams,
            pages: updatePages,
        };
    });
};

const useUpdateCommentReply = ({ onSuccess }: OnSuccessParam) => {
    const queryClient = useQueryClient();

    return useMutation<UpdateCommentReply['Response'], any, UpdateCommentReply['Request']>({
        mutationFn: ({ commentReplyId, contents }) => updateCommentReply({ commentReplyId, contents }),
        onSuccess: (data) => {
            onSuccess();
            updateCommentReplyListCache({ queryClient, data });
        },
    });
};

export default useUpdateCommentReply;
