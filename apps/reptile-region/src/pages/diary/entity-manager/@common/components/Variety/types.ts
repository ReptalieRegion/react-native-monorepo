import type { EntityVariety } from '@/types/apis/diary/entity';

type VarietyListItem = {
    varietyType: keyof EntityVariety;
    data: string[];
};

type VarietyList = [string, VarietyListItem, string, VarietyListItem, string, VarietyListItem, string, VarietyListItem];

enum VarietyTypeIndex {
    classification = 1,
    species = 3,
    detailedSpecies = 5,
    morph = 7,
}

type VarietyState = {
    list: VarietyList;
    selected: EntityVariety;
};

interface SelectVariety {
    type: 'SELECT';
    varietyType: keyof EntityVariety;
    value: string;
}

type VarietyActions = SelectVariety;

export { VarietyTypeIndex };
export type { SelectVariety, VarietyActions, VarietyList, VarietyListItem, VarietyState };
