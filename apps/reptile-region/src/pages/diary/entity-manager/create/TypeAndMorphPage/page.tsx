import { Typo } from '@reptile-region/design-system';
import React from 'react';

import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import CreateTemplate from '@/components/diary/templates/CreateTemplate/CreateTemplate';
import type { EntityManagerCreateTypeAndMorphScreenProps } from '@/types/routes/props/diary';

export default function EntityManagerTypeAndMorphPage({ navigation }: EntityManagerCreateTypeAndMorphScreenProps) {
    const nextPage = () => {
        navigation.navigate('weight');
    };

    return (
        <CreateTemplate
            title="종류와 모프를 선택해주세요."
            description="현재 개체의 종류와 모프를 알려주세요."
            contents={<Typo>hi</Typo>}
            button={<ConfirmButton text="다음" onPress={nextPage} />}
        />
    );
}
