import clientFetch, { METHOD } from '@/apis/@utils/fetcher';
import { objectToQueryString } from '@/apis/@utils/parser/query-string';
import type { CreateComment, DeleteComment, FetchComment, UpdateComment } from '@/types/apis/share-post/comment';
import type { WithInfinitePageParam } from '@/types/apis/utils';

/**
 *
 * GET
 */
// 특정 게시글 댓글 패치
export const getComments = async ({ pageParam, postId }: WithInfinitePageParam<FetchComment['Request']>) => {
    const queryString = objectToQueryString({
        pageParam,
    });
    const response = await clientFetch(`api/share/posts/${postId}/comments/list?${queryString}`, {
        method: METHOD.GET,
    });

    return response.json();
};

/**
 *
 * POST
 */
// 특정 게시글 댓글 생성
export const createComment = async (body: CreateComment['Request']) => {
    const response = await clientFetch('api/share/comment', {
        method: METHOD.POST,
        body,
    });

    return response.json();
};

/**
 *
 * PUT
 */
// 특정 댓글 수정
export const updateComment = async ({ commentId, contents }: UpdateComment['Request']) => {
    const response = await clientFetch(`api/share/comments/${commentId}`, {
        method: METHOD.PUT,
        body: {
            contents,
        },
    });

    return response.json();
};

/**
 *
 * DELETE
 */
// 댓글 삭제
export const deleteComment = async ({ commentId }: DeleteComment['Request']) => {
    const response = await clientFetch(`api/share/comments/${commentId}`, {
        method: METHOD.DELETE,
    });

    return response.json();
};
