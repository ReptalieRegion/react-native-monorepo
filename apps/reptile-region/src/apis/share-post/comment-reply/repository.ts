import type { InfinitePageParam } from '<InfiniteState>';
import type {
    CreateCommentReplyRequest,
    DeleteCommentReplyRequest,
    GetCommentRepliesRequest,
    UpdateCommentReplyRequest,
} from '<SharePostCommentReplyAPI>';
import clientFetch, { METHOD } from '@/apis/clientFetch';

/** GET */
export const getCommentReplies = async ({ pageParam = 0, commentId }: GetCommentRepliesRequest & InfinitePageParam) => {
    const response = await clientFetch(`api/share/comment/${commentId}/replies/list?pageParam=${pageParam}`, {
        method: METHOD.GET,
    });

    return response.json();
};

/** POST */
// 대댓글 생성
export const createCommentReply = async (body: CreateCommentReplyRequest) => {
    const response = await clientFetch('api/share/comment-reply', {
        method: METHOD.POST,
        body,
    });

    return response.json();
};

/** PUT */
// 특정 대댓글 수정
export const updateCommentReply = async ({ commentReplyId }: UpdateCommentReplyRequest) => {
    const response = await clientFetch(`api/share/comment-replies/${commentReplyId}`, {
        method: METHOD.PUT,
    });

    return response.json();
};

/** DELETE */
// 특정 대댓글 삭제
export const deleteCommentReply = async ({ commentReplyId }: DeleteCommentReplyRequest) => {
    const response = await clientFetch(`api/share/comment-replies/${commentReplyId}`, {
        method: METHOD.DELETE,
    });

    return response.json();
};
