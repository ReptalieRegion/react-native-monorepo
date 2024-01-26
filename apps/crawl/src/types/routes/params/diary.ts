import type { EntityGender, EntityVariety } from '@/types/apis/diary/entity';
import type { ImageType } from '@/types/global/image';

// 개체 상세 페이지
type EntityDetailParams = {
    entityId: string;
};

// 개체 수정
type EntityUpdateParams = {
    entity: {
        id: string;
        image: ImageType;
        variety: EntityVariety;
        name: string;
        hatching: string | undefined;
        gender: EntityGender;
    };
};

// 캘린더 리스트
type CalendarListParams = {
    initialDateString?: string;
};

// 캘린더 상세 페이지
type CalendarDetailParams = {
    calendar: {
        id: string;
    };
    entity: {
        id: string;
    };
    searchDate: string;
};

export type { CalendarDetailParams, CalendarListParams, EntityDetailParams, EntityUpdateParams };
