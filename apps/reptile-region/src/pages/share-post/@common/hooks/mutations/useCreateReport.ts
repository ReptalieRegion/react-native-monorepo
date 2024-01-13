import { useBottomSheet } from '@crawl/bottom-sheet';
import { QueryClient, useQueryClient, type InfiniteData } from '@tanstack/react-query';

import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useBaseCreateReport from '@/apis/report/mutations/useBaseCreateReport';
import useToast from '@/components/overlay/Toast/useToast';
import type { FetchComment, FetchCommentResponse } from '@/types/apis/share-post/comment';
import type { FetchCommentReply, FetchCommentReplyResponse } from '@/types/apis/share-post/comment-reply';
import type {
    FetchDetailUserPost,
    FetchDetailUserPostResponse,
    FetchPostResponse,
    FetchPosts,
} from '@/types/apis/share-post/post';
import type { InfiniteState } from '@/types/apis/utils';

interface PostContext {
    type: '게시글';
    nickname: string;
    prevPostList: InfiniteData<InfiniteState<FetchPostResponse[]>, number> | undefined;
    prevDetailPostList: InfiniteData<InfiniteState<FetchDetailUserPostResponse[]>, number> | undefined;
}

interface CommentContext {
    type: '댓글';
    postId: string;
    prevCommentList: InfiniteData<InfiniteState<FetchCommentResponse[]>, number> | undefined;
}

interface CommentReplyContext {
    type: '대댓글';
    commentId: string;
    prevCommentReplyList: InfiniteData<InfiniteState<FetchCommentReplyResponse[]>, number> | undefined;
}

type Context = PostContext | CommentContext | CommentReplyContext;

export default function useCreateReport() {
    const queryClient = useQueryClient();
    const openToast = useToast();
    const { bottomSheetClose } = useBottomSheet();

    return useBaseCreateReport<Context>({
        onMutate: async (variables) => {
            bottomSheetClose();
            switch (variables.type) {
                case '게시글':
                    const [prevPostList, prevDetailPostList] = await Promise.all([
                        deletePostFromPostList({ queryClient, postId: variables.typeId }),
                        deletePostFromDetailPostList({
                            queryClient,
                            postId: variables.typeId,
                            nickname: variables.nickname,
                        }),
                    ]);
                    return {
                        type: '게시글',
                        nickname: variables.nickname,
                        prevPostList,
                        prevDetailPostList,
                    };
                case '댓글':
                    const prevCommentList = await deleteComment({
                        queryClient,
                        commentId: variables.typeId,
                        postId: variables.postId,
                    });
                    return {
                        type: '댓글',
                        postId: variables.postId,
                        prevCommentList,
                    };
                case '대댓글':
                    const prevCommentReplyList = await deleteCommentReply({
                        queryClient,
                        commentId: variables.commentId,
                        commentReplyId: variables.type,
                    });
                    return {
                        type: '대댓글',
                        commentId: variables.commentId,
                        prevCommentReplyList,
                    };
            }
        },
        onError: (_error, _variables, context) => {
            openToast({ contents: '신고가 실패했습니다', severity: 'error' });
            switch (context?.type) {
                case '게시글':
                    queryClient.setQueryData(SHARE_POST_QUERY_KEYS.list, context.prevPostList);
                    queryClient.setQueryData(
                        SHARE_POST_QUERY_KEYS.detailUserPosts(context.nickname),
                        context.prevDetailPostList,
                    );
                    return;
                case '댓글':
                    queryClient.setQueryData(SHARE_POST_QUERY_KEYS.comment(context.postId), context.prevCommentList);
                    return;
                case '대댓글':
                    queryClient.setQueryData(
                        SHARE_POST_QUERY_KEYS.commentReply(context.commentId),
                        context.prevCommentReplyList,
                    );
                    return;
            }
        },
        onSuccess: (_data, variables) => {
            openToast({ contents: '신고 접수에 성공했어요', severity: 'success' });
            switch (variables.type) {
                case '게시글':
                    queryClient.invalidateQueries({ queryKey: SHARE_POST_QUERY_KEYS.list, exact: true });
                    queryClient.invalidateQueries({
                        queryKey: SHARE_POST_QUERY_KEYS.detailUserPosts(variables.nickname),
                        exact: true,
                    });
                    return;
                case '댓글':
                    queryClient.invalidateQueries({ queryKey: SHARE_POST_QUERY_KEYS.comment(variables.postId), exact: true });
                    return;
                case '대댓글':
                    queryClient.invalidateQueries({
                        queryKey: SHARE_POST_QUERY_KEYS.commentReply(variables.commentId),
                        exact: true,
                    });
                    return;
            }
        },
    });
}

// 게시글 리스트에서 특정 게시글 삭제
async function deletePostFromPostList({ queryClient, postId }: { queryClient: QueryClient; postId: string }) {
    const queryKey = SHARE_POST_QUERY_KEYS.list;

    await queryClient.cancelQueries({ queryKey });

    const prevPostList = queryClient.getQueryData<InfiniteData<FetchPosts['Response'], number>>(queryKey);

    queryClient.setQueryData<InfiniteData<FetchPosts['Response'], number>>(queryKey, (prevData) => {
        if (prevData === undefined) {
            return prevPostList;
        }

        const { pageParams, pages } = prevData;
        const updatePages = [...pages].map((page) => {
            const { items, nextPage } = page;
            return {
                nextPage,
                items: items.filter((item) => item.post.id !== postId),
            };
        });

        return {
            pageParams,
            pages: updatePages,
        };
    });

    return prevPostList;
}

// 특정 유저 게시글 리스트에서 특정 게시글 삭제
async function deletePostFromDetailPostList({
    queryClient,
    nickname,
    postId,
}: {
    queryClient: QueryClient;
    nickname: string;
    postId: string;
}) {
    const queryKey = SHARE_POST_QUERY_KEYS.detailUserPosts(nickname);

    await queryClient.cancelQueries({ queryKey });

    const prevDetailPostList = queryClient.getQueryData<InfiniteData<FetchDetailUserPost['Response'], number>>(queryKey);

    queryClient.setQueryData<InfiniteData<FetchDetailUserPost['Response'], number>>(queryKey, (prevData) => {
        if (prevData === undefined) {
            return prevData;
        }

        const { pageParams, pages } = prevData;
        const updatePages = [...pages].map((page) => {
            const { items, nextPage } = page;
            return {
                nextPage,
                items: items.filter((item) => item.post.id !== postId),
            };
        });

        return {
            pageParams,
            pages: updatePages,
        };
    });

    return prevDetailPostList;
}

async function deleteComment({
    queryClient,
    commentId,
    postId,
}: {
    queryClient: QueryClient;
    commentId: string;
    postId: string;
}) {
    const queryKey = SHARE_POST_QUERY_KEYS.comment(postId);

    await queryClient.cancelQueries({ queryKey });

    const prevCommentList = queryClient.getQueryData<InfiniteData<FetchComment['Response'], number>>(queryKey);

    queryClient.setQueryData<InfiniteData<FetchComment['Response'], number>>(queryKey, (prevData) => {
        if (prevData === undefined) {
            return prevData;
        }

        const { pageParams, pages } = prevData;
        const updatePages = [...pages].map((page) => {
            const { items, nextPage } = page;
            return {
                nextPage,
                items: items.filter((item) => item.comment.id !== commentId),
            };
        });

        return {
            pageParams,
            pages: updatePages,
        };
    });

    return prevCommentList;
}

async function deleteCommentReply({
    queryClient,
    commentId,
    commentReplyId,
}: {
    queryClient: QueryClient;
    commentId: string;
    commentReplyId: string;
}) {
    const queryKey = SHARE_POST_QUERY_KEYS.commentReply(commentId);

    await queryClient.cancelQueries({ queryKey });

    const prevCommentList = queryClient.getQueryData<InfiniteData<FetchCommentReply['Response'], number>>(queryKey);
    queryClient.setQueryData<InfiniteData<FetchCommentReply['Response'], number>>(queryKey, (prevData) => {
        if (prevData === undefined) {
            return prevData;
        }

        const { pageParams, pages } = prevData;
        const updatePages = [...pages].map((page) => {
            const { items, nextPage } = page;
            return {
                nextPage,
                items: items.filter((item) => item.commentReply.id !== commentReplyId),
            };
        });

        return {
            pageParams,
            pages: updatePages,
        };
    });

    return prevCommentList;
}
