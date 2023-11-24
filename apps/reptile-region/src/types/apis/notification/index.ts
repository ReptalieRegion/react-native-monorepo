import type { InfiniteState, ServerAPI } from '<api/utils>';

/**
 * 공통 타입
 */
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

enum PushAgreeType {
    Comment = '댓글',
    Like = '좋아요',
    Follow = '팔로우',
    Notice = '공지사항',
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

/**
 *
 * GET
 */
// 푸시알림 로그 조회
type FetchPushLogResponse = {
    messageId: string;
    contents: PushLogContents;
    isRead: boolean;
    createdAt: string;
};

type FetchPushLog = ServerAPI<void, InfiniteState<FetchPushLogResponse>>;

// 푸시알림 동의 조회
type FetchPushAgreeResponse = {
    isAgreeComment: boolean;
    isAgreePostLike: boolean;
    isAgreeService: boolean;
    isAgreeFollow: boolean;
};

type FetchPushAgree = ServerAPI<void, FetchPushAgreeResponse>;

// 푸시알림 읽음 여부 조회
type FetchPushReadCheckResponse = {
    isReadAllLog: boolean;
};

type FetchPushReadCheck = ServerAPI<void, FetchPushReadCheckResponse>;

/**
 *
 * POST
 */
// 푸시알림 동의 생성
type CreatePushAgreeRequest = {
    isAgree: boolean;
};

type CreatePushAgree = ServerAPI<CreatePushAgreeRequest, void>;

/**
 * PUT
 */
// 푸시알림 동의 수정
type UpdatePushAgreeRequest = {
    type: PushAgreeType;
    isAgree: boolean;
};

type UpdatePushAgree = ServerAPI<UpdatePushAgreeRequest, unknown>;

// 푸시알림 클릭해서 앱 접속인지 기록
type UpdatePushClickedRequest = {
    messageId: string;
};

export { ContentType, PushAgreeType, TemplateTitleType };
export type {
    CreatePushAgree,
    FetchPushAgree,
    FetchPushLog,
    FetchPushLogResponse,
    FetchPushReadCheck,
    UpdatePushAgree,
    UpdatePushClickedRequest,
};
