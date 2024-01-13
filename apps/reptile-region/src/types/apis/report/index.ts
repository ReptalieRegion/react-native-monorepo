import type { ServerAPI } from '../utils';

/**
 * 공통 타입
 */
const enum ReportDetailsType {
    PORNOGRAPHY = '성적인 내용이나 음란물이에요',
    ABUSE_LANGUAGE = '욕설, 생명경시, 비방적 언어 등의 내용이에요',
    ADVERTISING = '상업적인 내용이나 광고 목적의 내용이에요',
    ILLEGAL_INFORMATION = '불법 정보 또는 행위와 관련된 내용이에요',
    PRIVACY_EXPOSURE = '다른 사용자의 개인정보를 무단으로 노출했어요',
}

/**
 *
 * POST
 */
// 푸시알림 동의 생성
interface ReportInfo {
    reported: string;
    typeId: string;
    details: ReportDetailsType;
}
interface CommentReport extends ReportInfo {
    type: '댓글';
    postId: string;
}

interface CommentReplyReport extends ReportInfo {
    type: '대댓글';
    commentId: string;
}

interface PostReport extends ReportInfo {
    type: '게시글';
    nickname: string;
}

type CreateReportRequest = PostReport | CommentReplyReport | CommentReport;

type CreateReport = ServerAPI<CreateReportRequest, void>;

export { ReportDetailsType };
export type { CommentReplyReport, CommentReport, CreateReport, PostReport };
