type EntityImage = {
    sourceURL: string | undefined;
    uri: string;
    name: string;
    type: string;
};

type EntityGender = 'Male' | 'Female' | 'Uncategorized';

type CreateEntityState = {
    image: EntityImage | null;
    gender: EntityGender | null;
    hatchingDate: Date | null;
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

interface SetName {
    type: 'SET_NAME';
    name: string;
}

interface SetWeight {
    type: 'SET_WEIGHT';
    weight: string;
}

type CreateEntityActions = SetImage | SetGender | SetHatchingDate | SetName | SetWeight;

export type {
    CreateEntityActions,
    CreateEntityState,
    EntityGender,
    EntityImage,
    SetGender,
    SetHatchingDate,
    SetImage,
    SetName,
    SetWeight,
};
