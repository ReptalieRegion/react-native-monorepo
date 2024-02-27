type EntityGender = 'Male' | 'Female' | 'Uncategorized';

type EntitySize = '베이비' | '아성체' | '준성체' | '성체';

type EntityVariety = {
    classification: string;
    species: string;
    detailedSpecies: string;
    morph?: string[];
};

export type { EntitySize, EntityGender, EntityVariety };
