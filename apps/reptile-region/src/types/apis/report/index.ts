import type { ServerAPI } from '../utils';

/**
 * 공통 타입
 */
enum ReportType {
    POST = '게시글',
    COMMENT = '댓글',
    REPLY = '대댓글',
}

enum ReportDetailsType {
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
type CreateReportRequest = {
    reported: string;
    type: ReportType;
    typeId: string;
    details: ReportDetailsType;
};

type CreateReport = ServerAPI<CreateReportRequest, void>;

export { ReportDetailsType, ReportType };
export type { CreateReport };
