import { isDate } from 'lodash-es';

import type { CreateEntityActions, CreateEntityState, EntityGender, EntityImage } from '../type';

import type { EntityVariety, WeightUnit } from '@/types/apis/diary/entity';

const setImage = (state: CreateEntityState, image: EntityImage): CreateEntityState => {
    if (!image.uri || !image.name) {
        return state;
    }

    return { ...state, image };
};

const setGender = (state: CreateEntityState, gender: EntityGender): CreateEntityState => {
    return { ...state, gender };
};

const setHatchingDate = (state: CreateEntityState, hatchingDate: Date | undefined): CreateEntityState => {
    if (!isDate(hatchingDate)) {
        return state;
    }

    return { ...state, hatchingDate };
};

const setVariety = (state: CreateEntityState, variety: EntityVariety): CreateEntityState => {
    return { ...state, variety };
};

const setName = (state: CreateEntityState, name: string): CreateEntityState => {
    return { ...state, name };
};

const setWeight = (state: CreateEntityState, weightUnit: WeightUnit): CreateEntityState => {
    return { ...state, weightUnit };
};

const createEntityReducer = (state: CreateEntityState, actions: CreateEntityActions) => {
    switch (actions.type) {
        case 'SET_IMAGE':
            return setImage(state, actions.image);
        case 'SET_GENDER':
            return setGender(state, actions.gender);
        case 'SET_HATCHING_DATE':
            return setHatchingDate(state, actions.hatchingDate);
        case 'SET_VARIETY':
            return setVariety(state, actions.variety);
        case 'SET_NAME':
            return setName(state, actions.name);
        case 'SET_WEIGHT':
            return setWeight(state, actions.weightUnit);
    }
};

export default createEntityReducer;
