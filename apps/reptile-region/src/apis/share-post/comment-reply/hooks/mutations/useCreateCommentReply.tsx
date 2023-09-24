import { InfiniteData, QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { createCommentReply } from '../../repository';

import type { CreateCommentReply, FetchCommentReply } from '<api/share/post/comment-reply>';
import type { FetchComment } from '<api/share/post/comment>';
import { sharePostQueryKeys } from '@/apis/query-keys';

/** 특정 게시글 댓글 리스트 무한 스크롤 대댓글 개수 수정 */
const updateCommentListCache = ({ queryClient, data }: { queryClient: QueryClient; data: CreateCommentReply['Response'] }) => {
    const queryKey = sharePostQueryKeys.comment(data.post.id);

    queryClient.setQueryData<InfiniteData<FetchComment['Response']>>(queryKey, (prevCommentList) => {
        if (prevCommentList === undefined) {
            return prevCommentList;
        }

        const { pageParams, pages } = prevCommentList;
        return {
            pageParams,
            pages: [...pages].map((page) => {
                const { items, nextPage } = page;

                return {
                    nextPage,
                    items: items.map((item) => {
                        if (item.comment.id === data.post.comment.id) {
                            return {
                                ...item,
                                comment: {
                                    ...item.comment,
                                    replyCount: item.comment.replyCount + 1,
                                },
                            };
                        }

                        return item;
                    }),
                };
            }),
        };
    });
};

/** 대댓글 리스트 무한스크롤 대댓글 추가 */
const updateCommentReplyListCache = ({
    queryClient,
    data,
}: {
    queryClient: QueryClient;
    data: CreateCommentReply['Response'];
}) => {
    const queryKey = sharePostQueryKeys.commentReply(data.post.comment.id);

    queryClient.setQueryData<InfiniteData<FetchCommentReply['Response']>>(queryKey, (prevCommentReplyData) => {
        if (prevCommentReplyData === undefined) {
            return prevCommentReplyData;
        }

        const updatePages = [...prevCommentReplyData.pages];
        const commentReply = data.post.comment.commentReply;
        updatePages[0] = {
            nextPage: updatePages[0].nextPage,
            items: [{ commentReply }, ...updatePages[0].items],
        };

        return {
            ...prevCommentReplyData,
            pages: updatePages,
        };
    });
};

const useCreateCommentReply = () => {
    const queryClient = useQueryClient();
    return useMutation<CreateCommentReply['Response'], any, CreateCommentReply['Request']>({
        mutationFn: ({ commentId, contents }) => createCommentReply({ commentId, contents }),
        onSuccess: (data) => {
            updateCommentListCache({ queryClient, data });
            updateCommentReplyListCache({ queryClient, data });
        },
    });
};

export default useCreateCommentReply;
