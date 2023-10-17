import type {
    CreateCommentRequest,
    DeleteCommentRequest,
    FetchCommentRequest,
    UpdateCommentRequest,
} from '<api/share/post/comment>';
import type { InfinitePageParam } from '<api/utils>';
import clientFetch, { METHOD } from '@/apis/clientFetch';
import { objectToQueryString } from '@/utils/network/query-string';

/** GET */
// 특정 게시글 댓글 패치
export const getComments = async ({ pageParam = 0, postId }: FetchCommentRequest & InfinitePageParam) => {
    const queryString = objectToQueryString({
        pageParam,
    });
    const response = await clientFetch(`api/share/posts/${postId}/comments/list?${queryString}`, {
        method: METHOD.GET,
    });

    return response.json();
};

/** POST */
// 특정 게시글 댓글 생성
export const createComment = async (body: CreateCommentRequest) => {
    const response = await clientFetch('api/share/comment', {
        method: METHOD.POST,
        body,
    });

    return response.json();
};

/** PUT */
// 특정 댓글 수정
export const updateComment = async ({ commentId, contents }: UpdateCommentRequest) => {
    const response = await clientFetch(`api/share/comments/${commentId}`, {
        method: METHOD.PUT,
        body: {
            contents,
        },
    });

    return response.json();
};

/** DELETE */
// 댓글 삭제
export const deleteComment = async ({ commentId }: DeleteCommentRequest) => {
    const response = await clientFetch(`api/share/comments/${commentId}`, {
        method: METHOD.DELETE,
    });

    return response.json();
};
