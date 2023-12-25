import React, { useCallback } from 'react';

import CreateTemplate from '../@common/components/CreateTemplate';
import useCreateEntity from '../@common/context/CreateEntity/hooks/useCreateEntity';

import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import Variety from '@/components/diary/organisms/Variety/Variety';
import type { EntityVariety } from '@/types/apis/diary/entity';
import type { EntityManagerCreateTypeAndMorphScreenProps } from '@/types/routes/props/diary/entity';

export default function EntityManagerTypeAndMorphPage({ navigation }: EntityManagerCreateTypeAndMorphScreenProps) {
    const {
        entityDate: { variety },
        setCreateEntity,
    } = useCreateEntity();

    const nextPage = useCallback(() => {
        navigation.navigate('weight');
    }, [navigation]);

    const handlePressTag = useCallback(
        (changeVariety: EntityVariety) => {
            setCreateEntity({ type: 'SET_VARIETY', variety: changeVariety });
        },
        [setCreateEntity],
    );

    return (
        <CreateTemplate
            title="종류와 모프를 선택해주세요."
            description="현재 개체의 종류와 모프를 알려주세요."
            contentsAlign="top"
            contents={<Variety initialSelected={variety} onChangeVariety={handlePressTag} />}
            button={
                <ConfirmButton
                    text="다음"
                    onPress={nextPage}
                    disabled={
                        variety.classification.length === 0 ||
                        variety.species.length === 0 ||
                        variety.detailedSpecies.length === 0
                    }
                />
            }
        />
    );
}
