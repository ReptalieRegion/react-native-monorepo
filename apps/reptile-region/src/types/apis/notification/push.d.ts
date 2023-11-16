declare module '<api/my/notification>' {
    import { ServerAPI } from '<api/utils>';

    /** GET 시작 */
    type FetchPushAgreeResponse = {
        isAgreeComment: boolean;
        isAgreePostLike: boolean;
        isAgreeService: boolean;
        isAgreeFollow: boolean;
    };

    type FetchPushAgree = ServerAPI<void, FetchPushAgreeResponse>;
    /** GET 끝 */

    /** PUSH 시작 */
    type PushAgreeType = '댓글' | '좋아요' | '팔로우' | '공지사항';

    type UpdatePushAgreeRequest = {
        type: PushAgreeType;
        isAgree: boolean;
    };

    type UpdatePushAgreeResponse = {
        profile: ImageType;
    };

    type UpdatePushAgree = ServerAPI<UpdatePushAgreeRequest, UpdatePushAgreeResponse>;
    /** PUSH 끝 */
}
