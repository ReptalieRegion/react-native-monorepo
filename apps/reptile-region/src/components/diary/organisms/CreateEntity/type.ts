import type { EntityGender, EntityVariety } from '@/types/apis/diary/entity';

type EntityImage = {
    sourceURL: string | undefined;
    uri: string;
    name: string;
    type: string;
};

type ListItem = {
    type: keyof EntityVariety;
    itemList: string[];
};

type Variety = {
    selected: EntityVariety;
    list: ListItem[];
};

type CreateEntityState = {
    image: EntityImage | null;
    gender: EntityGender | null;
    hatchingDate: Date | null;
    variety: Variety;
    name: string | null;
    weight: string | null;
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
    hatchingDate: Date;
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

interface SetWeight {
    type: 'SET_WEIGHT';
    weight: string;
}

type CreateEntityActions = SetImage | SetGender | SetHatchingDate | SetVariety | SetName | SetWeight;

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
    SetWeight,
    Variety,
};
