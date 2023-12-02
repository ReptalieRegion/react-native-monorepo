import { isDate } from 'lodash-es';

import type { CreateEntityActions, CreateEntityState, EntityGender, EntityImage } from '../type';

const setImage = (state: CreateEntityState, image: EntityImage): CreateEntityState => {
    if (!image.uri || !image.name || !image.sourceURL) {
        return state;
    }

    return { ...state, image };
};

const setGender = (state: CreateEntityState, gender: EntityGender): CreateEntityState => {
    return { ...state, gender };
};

const setHatchingDate = (state: CreateEntityState, hatchingDate: Date): CreateEntityState => {
    if (!isDate(hatchingDate)) {
        return state;
    }

    return { ...state, hatchingDate };
};

const setName = (state: CreateEntityState, name: string): CreateEntityState => {
    return { ...state, name };
};

const setWeight = (state: CreateEntityState, weight: string): CreateEntityState => {
    return { ...state, weight };
};

const createEntityReducer = (state: CreateEntityState, actions: CreateEntityActions) => {
    switch (actions.type) {
        case 'SET_IMAGE':
            return setImage(state, actions.image);
        case 'SET_GENDER':
            return setGender(state, actions.gender);
        case 'SET_HATCHING_DATE':
            return setHatchingDate(state, actions.hatchingDate);
        case 'SET_NAME':
            return setName(state, actions.name);
        case 'SET_WEIGHT':
            return setWeight(state, actions.weight);
    }
};

export default createEntityReducer;
