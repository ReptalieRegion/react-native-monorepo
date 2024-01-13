import { detailedSpeciesList, morphList, speciesList } from './constants';
import type { SelectVariety, VarietyActions, VarietyList, VarietyListItem, VarietyState } from './types';
import { VarietyTypeIndex } from './types';

import type { EntityVariety } from '@/types/apis/diary/entity';

export default function varietyReducer(state: VarietyState, actions: VarietyActions) {
    switch (actions.type) {
        case 'SELECT':
            return selectedVariety(state, { varietyType: actions.varietyType, value: actions.value });
        default:
            return state;
    }
}

function selectedVariety(state: VarietyState, { value, varietyType }: Omit<SelectVariety, 'type'>): VarietyState {
    switch (varietyType) {
        case 'classification':
            return classificationSelect(state, value);
        case 'species':
            return speciesSelect(state, value);
        case 'detailedSpecies':
            return detailedSpeciesSelect(state, value);
        case 'morph':
            return morphSelect(state, value);
    }
}

function classificationSelect(state: VarietyState, value: string): VarietyState {
    const { list, selected } = state;
    const alreadySelected = value === selected.classification;
    const removedList = alreadySelected
        ? list
        : removeVarietyList({
              list,
              removeList: [VarietyTypeIndex.species, VarietyTypeIndex.detailedSpecies, VarietyTypeIndex.morph],
          });
    removedList[VarietyTypeIndex.species] = {
        varietyType: 'species',
        data: speciesList[value],
    };
    const newSelected: EntityVariety = alreadySelected
        ? selected
        : {
              ...selected,
              classification: value,
              species: '',
              detailedSpecies: '',
              morph: [],
          };

    return {
        list: removedList,
        selected: newSelected,
    };
}

function speciesSelect(state: VarietyState, value: string): VarietyState {
    const { list, selected } = state;
    const alreadySelected = value === selected.species;
    const removedList = removeVarietyList({
        list,
        removeList: [VarietyTypeIndex.detailedSpecies, VarietyTypeIndex.morph],
    });
    removedList[VarietyTypeIndex.detailedSpecies] = {
        varietyType: 'detailedSpecies',
        data: alreadySelected ? [] : detailedSpeciesList[value],
    };
    const newSelected: EntityVariety = alreadySelected
        ? {
              ...selected,
              species: '',
              detailedSpecies: '',
              morph: [],
          }
        : {
              ...selected,
              species: value,
              detailedSpecies: '',
              morph: [],
          };

    return {
        list: removedList,
        selected: newSelected,
    };
}

function detailedSpeciesSelect(state: VarietyState, value: string): VarietyState {
    const { list, selected } = state;
    const alreadySelected = value === selected.detailedSpecies;
    const removedList = removeVarietyList({
        list,
        removeList: [VarietyTypeIndex.morph],
    });
    removedList[VarietyTypeIndex.morph] = {
        varietyType: 'morph',
        data: alreadySelected ? [] : morphList[value],
    };
    const newSelected: EntityVariety = alreadySelected
        ? {
              ...selected,
              detailedSpecies: '',
              morph: [],
          }
        : {
              ...selected,
              detailedSpecies: value,
              morph: [],
          };

    return {
        list: removedList,
        selected: newSelected,
    };
}

function morphSelect(state: VarietyState, value: string): VarietyState {
    const { list, selected } = state;
    const alreadySelected = selected.morph?.findIndex((item) => item === value) !== -1;
    const newSelected: EntityVariety = alreadySelected
        ? {
              ...selected,
              morph: selected.morph?.filter((item) => item !== value),
          }
        : {
              ...selected,
              morph: selected.morph ? [...selected.morph, value] : [value],
          };

    return {
        list,
        selected: newSelected,
    };
}

function removeVarietyList({ list, removeList }: { list: VarietyList; removeList: VarietyTypeIndex[] }): VarietyList {
    const prevList = [...list];
    removeList.forEach((removeIndex) => {
        const currentItem = prevList[removeIndex] as VarietyListItem;
        prevList[removeIndex] = { ...currentItem, data: [] };
    });

    return prevList as VarietyList;
}
