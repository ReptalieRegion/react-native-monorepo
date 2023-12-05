import type { EntityGender, EntityVariety, WeightUnit } from '@/types/apis/diary/entity';

type EntityImage = {
    uri: string;
    name: string;
    type: string;
};

type VarietyListItem = {
    type: keyof EntityVariety;
    itemList: string[];
};

type Variety = {
    selected: EntityVariety;
    list: VarietyListItem[];
};

type CreateEntityState = {
    image: EntityImage | null;
    gender: EntityGender | null;
    hatchingDate: Date | undefined | null;
    variety: Variety;
    name: string | null;
    weightUnit: WeightUnit;
};

interface SetImage {
    type: 'SET_IMAGE';
    image: EntityImage;
}

interface SetGender {
    type: 'SET_GENDER';
    gender: EntityGender;
}

interface SetHatchingDate {
    type: 'SET_HATCHING_DATE';
    hatchingDate: Date | undefined;
}

interface SetVariety {
    type: 'SET_VARIETY';
    variety: {
        type: keyof EntityVariety;
        value: string;
    };
}

interface SetName {
    type: 'SET_NAME';
    name: string;
}

interface SetWeightUnit {
    type: 'SET_WEIGHT';
    weightUnit: WeightUnit;
}

type CreateEntityActions = SetImage | SetGender | SetHatchingDate | SetVariety | SetName | SetWeightUnit;

export type {
    CreateEntityActions,
    CreateEntityState,
    EntityGender,
    EntityImage,
    SetGender,
    SetHatchingDate,
    SetImage,
    SetName,
    SetVariety,
    SetWeightUnit,
    Variety,
    VarietyListItem,
};
