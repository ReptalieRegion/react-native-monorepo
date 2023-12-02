import { isDate } from 'lodash-es';

import type { CreateEntityActions, CreateEntityState, EntityGender, EntityImage, SetVariety } from '../type';

import { 모프로컬리스트, 상세종리스트, 종리스트 } from '@/json/entity';

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

const setVariety = (state: CreateEntityState, { type, value }: SetVariety['variety']): CreateEntityState => {
    const prevVarietyList = [...state.variety.list];

    if (type === '분류') {
        const selected = { ...state.variety.selected, [type]: value, 종: '', 상세종: '', 모프로컬: [] };
        const alreadySelected = value === state.variety.selected.분류;
        const newVarietyList = alreadySelected
            ? prevVarietyList
            : prevVarietyList.map((variety) => {
                  const removeListType = variety.type === '종' || variety.type === '상세종' || variety.type === '모프로컬';
                  return {
                      type: variety.type,
                      itemList: removeListType ? [] : variety.itemList,
                  };
              });
        const findIndex = newVarietyList.findIndex((prevItem) => prevItem.type === '종');
        newVarietyList[findIndex] = { type: '종', itemList: 종리스트[value] };

        const newSelected = alreadySelected ? { ...state.variety.selected } : selected;

        return {
            ...state,
            variety: {
                list: newVarietyList,
                selected: newSelected,
            },
        };
    }

    if (type === '종') {
        const selected = { ...state.variety.selected, [type]: value, 상세종: '', 모프로컬: [] };
        const alreadySelected = value === state.variety.selected.종;
        const newVarietyList = prevVarietyList.map((variety) => {
            const removeListType = variety.type === '상세종' || variety.type === '모프로컬';
            return {
                type: variety.type,
                itemList: removeListType ? [] : variety.itemList,
            };
        });
        const findIndex = newVarietyList.findIndex((prevItem) => prevItem.type === '상세종');
        newVarietyList[findIndex] = { type: '상세종', itemList: alreadySelected ? [] : 상세종리스트[value] };
        const newSelected = alreadySelected ? { ...state.variety.selected, [type]: '', 상세종: '', 모프로컬: [] } : selected;

        return {
            ...state,
            variety: {
                list: newVarietyList,
                selected: newSelected,
            },
        };
    }

    if (type === '상세종') {
        const selected = { ...state.variety.selected, [type]: value, 모프로컬: [] };
        const alreadySelected = value === state.variety.selected.상세종;
        const newVarietyList = prevVarietyList.map((variety) => {
            const removeListType = variety.type === '모프로컬';
            return {
                type: variety.type,
                itemList: removeListType ? [] : variety.itemList,
            };
        });
        const findIndex = newVarietyList.findIndex((prevItem) => prevItem.type === '모프로컬');
        newVarietyList[findIndex] = { type: '모프로컬', itemList: alreadySelected ? [] : 모프로컬리스트[value] };

        const newSelected = alreadySelected ? { ...state.variety.selected, [type]: '', 모프로컬: [] } : selected;

        return {
            ...state,
            variety: {
                list: newVarietyList,
                selected: newSelected,
            },
        };
    }

    if (type === '모프로컬') {
        const alreadySelected = state.variety.selected.모프로컬.findIndex((item) => item === value) !== -1;
        const newSelected = alreadySelected
            ? { ...state.variety.selected, [type]: state.variety.selected.모프로컬.filter((item) => item !== value) }
            : { ...state.variety.selected, 모프로컬: [...state.variety.selected.모프로컬, value] };

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
        case 'SET_VARIETY':
            return setVariety(state, actions.variety);
        case 'SET_NAME':
            return setName(state, actions.name);
        case 'SET_WEIGHT':
            return setWeight(state, actions.weight);
    }
};

export default createEntityReducer;
