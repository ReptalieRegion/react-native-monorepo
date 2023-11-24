import type { InfiniteData } from '@tanstack/react-query';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { createComment } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { CreateComment, FetchComment } from '@/types/apis/share-post/comment';
import type { FetchPosts } from '@/types/apis/share-post/post';

// TODO 낙관적 업데이트로 변경
// 댓글 생성
interface UseCreateCommentActions {
    onSuccess(): void;
}

type UseCreateCommentProps = UseCreateCommentActions;

export default function useCreateComment({ onSuccess }: UseCreateCommentProps) {
    const queryClient = useQueryClient();
    return useMutation<CreateComment['Response'], HTTPError, CreateComment['Request']>({
        mutationFn: ({ postId, contents }) => createComment({ postId, contents }),
        onSuccess: (data) => {
            onSuccess();
            updateShareCommentListCache({ queryClient, data });
            updateSharePostListCache({ queryClient, data });
        },
    });
}

// 특정 게시글 댓글 리스트 무한 스크롤 댓글 추가
function updateShareCommentListCache({ queryClient, data }: { queryClient: QueryClient; data: CreateComment['Response'] }) {
    const queryKey = SHARE_POST_QUERY_KEYS.comment(data.post.id);

    queryClient.setQueryData<InfiniteData<FetchComment['Response']>>(queryKey, (prevCommentList) => {
        if (prevCommentList === undefined) {
            return prevCommentList;
        }

        const { pageParams, pages } = prevCommentList;
        const updatePages = [...pages];
        updatePages[0] = {
            nextPage: updatePages[0].nextPage,
            items: [{ comment: data.post.comment }, ...updatePages[0].items],
        };

        return {
            pageParams,
            pages: updatePages,
        };
    });
}

// 일상공유 무한스크롤 조회 리스트 댓글 개수 증가
function updateSharePostListCache({ queryClient, data }: { queryClient: QueryClient; data: CreateComment['Response'] }) {
    const queryKey = SHARE_POST_QUERY_KEYS.list;

    queryClient.setQueryData<InfiniteData<FetchPosts['Response']>>(queryKey, (prevPostList) => {
        if (prevPostList === undefined) {
            return prevPostList;
        }

        const { pageParams, pages } = prevPostList;

        const updatePages = [...pages].map((page) => {
            const { nextPage, items } = page;
            return {
                nextPage,
                items: items.map((item) => {
                    const isTargetPost = item.post.id === data.post.id;
                    return isTargetPost ? { post: { ...item.post, commentCount: item.post.commentCount + 1 } } : item;
                }),
            };
        });

        return {
            pageParams,
            pages: updatePages,
        };
    });
}
