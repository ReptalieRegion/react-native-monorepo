import type { InfiniteData } from '@tanstack/react-query';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { createCommentReply } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchComment } from '@/types/apis/share-post/comment';
import type { CreateCommentReply, FetchCommentReply } from '@/types/apis/share-post/comment-reply';

// 대댓글 생성
interface UseCreateCommentReplyActions {
    onSuccess(): void;
}

type UseCreateCommentReplyProps = UseCreateCommentReplyActions;

export default function useCreateCommentReply({ onSuccess }: UseCreateCommentReplyProps) {
    const queryClient = useQueryClient();
    return useMutation<CreateCommentReply['Response'], HTTPError, CreateCommentReply['Request']>({
        mutationFn: ({ commentId, contents }) => createCommentReply({ commentId, contents }),
        onSuccess: (data) => {
            onSuccess();
            updateCommentListCache({ queryClient, data });
            updateCommentReplyListCache({ queryClient, data });
        },
    });
}

// 특정 게시글 댓글 리스트 무한 스크롤 대댓글 개수 수정
function updateCommentListCache({ queryClient, data }: { queryClient: QueryClient; data: CreateCommentReply['Response'] }) {
    const queryKey = SHARE_POST_QUERY_KEYS.comment(data.post.id);

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
}

// 대댓글 리스트 무한스크롤 대댓글 추가
function updateCommentReplyListCache({
    queryClient,
    data,
}: {
    queryClient: QueryClient;
    data: CreateCommentReply['Response'];
}) {
    const queryKey = SHARE_POST_QUERY_KEYS.commentReply(data.post.comment.id);

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
}