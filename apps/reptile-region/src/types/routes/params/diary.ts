import type { EntityGender, EntityVariety, WeightUnit } from '@/types/apis/diary/entity';
import type { ImageType } from '@/types/global/image';

// 개체 상세 페이지
type EntityDetailParams = {
    entityId: string;
};

// 개체 옵션 메뉴
type EntityOptionsMenuParams = {
    entity: {
        id: string;
        image: ImageType;
        variety: EntityVariety;
        name: string;
        hatching: string | undefined;
        gender: EntityGender;
    };
};

// 개체 몸무게 생성 바텀시트
type EntityCreateWeightParams = {
    entity: {
        id: string;
        weightUnit: WeightUnit;
    };
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

type CalendarListParams = {
    initialDateString?: string;
};

export type { CalendarListParams, EntityCreateWeightParams, EntityDetailParams, EntityOptionsMenuParams, EntityUpdateParams };
