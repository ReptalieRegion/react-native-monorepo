import type { InfiniteState, ServerAPI } from '<api/utils>';

/** GET 시작 */
enum ContentType {
    Profile = '프로필이미지',
    SharePost = '일상공유이미지',
    Notice = '공지사항',
}

enum TemplateTitleType {
    Share = '일상공유',
    User = '회원',
    Service = '서비스',
    Default = '크롤',
}

interface BasicContents {
    deepLink: string;
    title: TemplateTitleType;
    article: string;
}

interface ProfileContent extends BasicContents {
    type: ContentType.Profile;
    profileThumbnail: string;
}

interface SharePostContent extends BasicContents {
    type: ContentType.SharePost;
    profileThumbnail: string;
    postThumbnail: string;
}

interface NoticeContent extends BasicContents {
    type: ContentType.Notice;
}

type PushLogContents = ProfileContent | SharePostContent | NoticeContent;

type FetchPushLogResponse = {
    messageId: string;
    contents: PushLogContents;
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
enum PushAgreeType {
    Comment = '댓글',
    Like = '좋아요',
    Follow = '팔로우',
    Notice = '공지사항',
}

type UpdatePushAgreeRequest = {
    type: PushAgreeType;
    isAgree: boolean;
};

type UpdatePushAgree = ServerAPI<UpdatePushAgreeRequest, unknown>;

type UpdatePushClickedRequest = {
    messageId: string;
};
/** PUT 끝 */

export { ContentType, PushAgreeType, TemplateTitleType };
export type { CreatePushAgree, FetchPushAgree, FetchPushLog, FetchPushLogResponse, UpdatePushAgree, UpdatePushClickedRequest };
