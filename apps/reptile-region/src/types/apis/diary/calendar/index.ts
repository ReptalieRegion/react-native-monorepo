import type { ServerAPI } from '../../utils';
import type { EntityGender, EntityVariety } from '../entity';

import type { ImageType } from '@/types/global/image';

/**
 *
 * 공통 타입
 */

type DiaryCalendarMarkType = '먹이급여' | '청소' | '탈피' | '메이팅' | '산란' | '온욕' | '배변';

/**
 *
 * GET
 */
type FetchCalendarRequest = {
    date: string;
};

type FetchCalendarItem = {
    calendar: {
        id: string;
        memo: string;
        markType: DiaryCalendarMarkType[];
        date: string;
    };
    entity: {
        id: string;
        name: string;
        image: ImageType;
        gender: EntityGender;
        hatching: string | undefined;
        variety: EntityVariety;
    };
};

type FetchCalendarResponse = {
    items: FetchCalendarItem[];
};

type FetchCalendar = ServerAPI<FetchCalendarRequest, FetchCalendarResponse>;

/**
 *
 * POST
 */
// 다이어리 캘린더 등록
type CreateCalendarRequest = {
    entityId: string;
    memo: string;
    markType: DiaryCalendarMarkType[];
    date: Date;
};

type CreateCalendarResponse = {
    message: string;
};

type CreateCalendar = ServerAPI<CreateCalendarRequest, CreateCalendarResponse>;

/**
 *
 * PUT
 */
type UpdateCalendarRequest = {
    calendarId: string;
    memo?: string;
    markType?: DiaryCalendarMarkType[];
};

type UpdateCalendarResponse = {
    message: string;
};

type UpdateCalendar = ServerAPI<UpdateCalendarRequest, UpdateCalendarResponse>;

/**
 *
 * DELETE
 */
type DeleteCalendarRequest = {
    calendarId: string;
};

type DeleteCalendarResponse = {
    message: string;
};

type DeleteCalendar = ServerAPI<DeleteCalendarRequest, DeleteCalendarResponse>;

export type {
    CreateCalendar,
    CreateCalendarRequest,
    CreateCalendarResponse,
    DeleteCalendar,
    DeleteCalendarRequest,
    DeleteCalendarResponse,
    DiaryCalendarMarkType,
    FetchCalendar,
    FetchCalendarItem,
    FetchCalendarRequest,
    FetchCalendarResponse,
    UpdateCalendar,
    UpdateCalendarRequest,
    UpdateCalendarResponse,
};
