import type {
    CreateCommentReplyRequest,
    DeleteCommentReplyRequest,
    FetchCommentReplyRequest,
    UpdateCommentReplyRequest,
} from '<api/share/post/comment-reply>';
import type { InfinitePageParam } from '<api/utils>';
import clientFetch, { METHOD } from '@/apis/clientFetch';
import { objectToQueryString } from '@/utils/network/query-string';

/** GET */
// 대댓글 리스트 무한스크롤
export const getCommentReplies = async ({ pageParam = 0, commentId }: FetchCommentReplyRequest & InfinitePageParam) => {
    const queryString = objectToQueryString({ pageParam });
    const response = await clientFetch(`api/share/comments/${commentId}/replies/list?${queryString}`, {
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
// 사용자의 특정 대댓글 수정
export const updateCommentReply = async ({ commentReplyId, contents }: UpdateCommentReplyRequest) => {
    const response = await clientFetch(`api/share/comment-replies/${commentReplyId}`, {
        method: METHOD.PUT,
        body: { contents },
    });

    return response.json();
};

/** DELETE */
// 사용자의 특정 대댓글 삭제
export const deleteCommentReply = async ({ commentReplyId }: DeleteCommentReplyRequest) => {
    const response = await clientFetch(`api/share/comment-replies/${commentReplyId}`, {
        method: METHOD.DELETE,
    });

    return response.json();
};
