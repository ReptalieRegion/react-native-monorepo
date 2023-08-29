import type { InfinitePageParam } from '<InfiniteState>';
import type {
    CreateCommentRequest,
    DeleteCommentRequest,
    GetCommentsRequest,
    UpdateCommentRequest,
} from '<SharePostCommentAPI>';
import clientFetch, { METHOD } from '@/apis/clientFetch';

/** GET */
// 특정 게시글 댓글 패치
export const getComments = async ({ pageParam = 0, postId }: GetCommentsRequest & InfinitePageParam) => {
    const response = await clientFetch(`api/share/post/${postId}/comments/list?pageParam=${pageParam}`, {
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
export const updateComment = async ({ commentId }: UpdateCommentRequest) => {
    const response = await clientFetch(`api/share/comments/${commentId}`, {
        method: METHOD.PUT,
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
