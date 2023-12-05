import { isDate } from 'lodash-es';

import type { CreateEntityActions, CreateEntityState, EntityGender, EntityImage, SetVariety } from '../type';

import { detailedSpeciesList, morphList, speciesList } from '@/json/entity';
import type { WeightUnit } from '@/types/apis/diary/entity';

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

const setVariety = (state: CreateEntityState, { type, value }: SetVariety['variety']): CreateEntityState => {
    const prevVarietyList = [...state.variety.list];

    if (type === 'classification') {
        const selected = { ...state.variety.selected, [type]: value, species: '', detailedSpecies: '', morph: [] };
        const alreadySelected = value === state.variety.selected.classification;
        const newVarietyList = alreadySelected
            ? prevVarietyList
            : prevVarietyList.map((variety) => {
                  const removeListType =
                      variety.type === 'species' || variety.type === 'detailedSpecies' || variety.type === 'morph';
                  return {
                      type: variety.type,
                      itemList: removeListType ? [] : variety.itemList,
                  };
              });
        const findIndex = newVarietyList.findIndex((prevItem) => prevItem.type === 'species');
        newVarietyList[findIndex] = { type: 'species', itemList: speciesList[value] };

        const newSelected = alreadySelected ? { ...state.variety.selected } : selected;

        return {
            ...state,
            variety: {
                list: newVarietyList,
                selected: newSelected,
            },
        };
    }

    if (type === 'species') {
        const selected = { ...state.variety.selected, [type]: value, detailedSpecies: '', morph: [] };
        const alreadySelected = value === state.variety.selected.species;
        const newVarietyList = prevVarietyList.map((variety) => {
            const removeListType = variety.type === 'detailedSpecies' || variety.type === 'morph';
            return {
                type: variety.type,
                itemList: removeListType ? [] : variety.itemList,
            };
        });
        const findIndex = newVarietyList.findIndex((prevItem) => prevItem.type === 'detailedSpecies');
        newVarietyList[findIndex] = { type: 'detailedSpecies', itemList: alreadySelected ? [] : detailedSpeciesList[value] };
        const newSelected = alreadySelected
            ? { ...state.variety.selected, [type]: '', detailedSpecies: '', morph: [] }
            : selected;

        return {
            ...state,
            variety: {
                list: newVarietyList,
                selected: newSelected,
            },
        };
    }

    if (type === 'detailedSpecies') {
        const selected = { ...state.variety.selected, [type]: value, morph: [] };
        const alreadySelected = value === state.variety.selected.detailedSpecies;
        const newVarietyList = prevVarietyList.map((variety) => {
            const removeListType = variety.type === 'morph';
            return {
                type: variety.type,
                itemList: removeListType ? [] : variety.itemList,
            };
        });
        const findIndex = newVarietyList.findIndex((prevItem) => prevItem.type === 'morph');
        newVarietyList[findIndex] = { type: 'morph', itemList: alreadySelected ? [] : morphList[value] };

        const newSelected = alreadySelected ? { ...state.variety.selected, [type]: '', morph: [] } : selected;

        return {
            ...state,
            variety: {
                list: newVarietyList,
                selected: newSelected,
            },
        };
    }

    if (type === 'morph') {
        const alreadySelected = state.variety.selected.morph?.findIndex((item) => item === value) !== -1;
        const newSelected = alreadySelected
            ? { ...state.variety.selected, [type]: state.variety.selected.morph?.filter((item) => item !== value) }
            : {
                  ...state.variety.selected,
                  morph: state.variety.selected.morph ? [...state.variety.selected.morph, value] : [value],
              };

        return {
            ...state,
            variety: {
                list: [...state.variety.list],
                selected: newSelected,
            },
        };
    }

    return state;
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
