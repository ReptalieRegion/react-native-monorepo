declare module '<api/my/notification>' {
    import type { InfiniteState, ServerAPI } from '<api/utils>';

    /** GET 시작 */
    type FetchPushLogResponse = {
        messageId: string;
        contents: {
            title: string;
            article: string;
            image?: string;
        };
        isRead: boolean;
    };

    type FetchPushLog = ServerAPI<void, InfiniteState<FetchPushLogResponse>>;

    type FetchPushAgreeResponse = {
        isAgreeComment: boolean;
        isAgreePostLike: boolean;
        isAgreeService: boolean;
        isAgreeFollow: boolean;
    };

    type FetchPushAgree = ServerAPI<void, FetchPushAgreeResponse>;
    /** GET 끝 */

    /** POST 시작 */
    type CreatePushAgreeRequest = {
        isAgree: boolean;
    };

    type CreatePushAgree = ServerAPI<CreatePushAgreeRequest, void>;
    /** POST 끝 */

    /** PUT 시작 */
    type PushAgreeType = '댓글' | '좋아요' | '팔로우' | '공지사항';

    type UpdatePushAgreeRequest = {
        type: PushAgreeType;
        isAgree: boolean;
    };

    type UpdatePushAgree = ServerAPI<UpdatePushAgreeRequest, unknown>;
    /** PUT 끝 */
}
