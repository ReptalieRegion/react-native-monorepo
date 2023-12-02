type EntityImage = {
    sourceURL: string | undefined;
    uri: string;
    name: string;
    type: string;
};

type EntityGender = 'Male' | 'Female' | 'Uncategorized';

type SelectedType = {
    분류: string;
    종: string;
    상세종: string;
    모프로컬: string[];
};

type ListItem = {
    type: keyof SelectedType;
    itemList: string[];
};

type Variety = {
    selected: SelectedType;
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
        type: keyof SelectedType;
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
    SelectedType,
    SetGender,
    SetHatchingDate,
    SetImage,
    SetName,
    SetVariety,
    SetWeight,
    Variety,
};
