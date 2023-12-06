import type { WeightUnit } from '@/types/apis/diary/entity';

// 개체 상세 페이지
type EntityDetailParams = {
    entityId: string;
};

// 개체 옵션 메뉴
type EntityOptionsMenuParams = {
    entityId: string;
};

// 개체 몸무게 생성 바텀시트
type EntityCreateWeightParams = {
    entity: {
        id: string;
        weightUnit: WeightUnit;
    };
};

export type { EntityCreateWeightParams, EntityDetailParams, EntityOptionsMenuParams };
