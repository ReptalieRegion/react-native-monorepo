import { useIsFocused } from '@react-navigation/native';
import React, { useCallback } from 'react';

import { TextField } from '@/components/@common/atoms';
import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import useCreateEntity from '@/components/diary/organisms/CreateEntity/hooks/useCreateEntity';
import CreateTemplate from '@/components/diary/templates/CreateTemplate/CreateTemplate';
import useKeyboardOpenButtonSize from '@/hooks/@common/useKeyboardOpenButtonSize';
import type { EntityManagerCreateNameScreenProps } from '@/types/routes/props/diary';

export default function EntityManagerNamePage({ navigation }: EntityManagerCreateNameScreenProps) {
    const buttonSize = useKeyboardOpenButtonSize();
    const isFocused = useIsFocused();
    const {
        entityDate: { name },
        setCreateEntity,
    } = useCreateEntity();

    const handleChangeName = useCallback(
        (text: string) => {
            setCreateEntity({ type: 'SET_NAME', name: text });
        },
        [setCreateEntity],
    );

    const nextPage = useCallback(() => {
        navigation.navigate('congrats');
    }, [navigation]);

    return (
        <CreateTemplate
            title="개체의 이름을 등록해주세요."
            description="현재 개체의 이름을 알려주세요."
            contentsAlign="top"
            contents={
                <TextField
                    label={'몸무게'}
                    size="small"
                    value={name ?? ''}
                    onChangeText={handleChangeName}
                    autoFocus={isFocused}
                />
            }
            button={<ConfirmButton text="다음" size={buttonSize} onPress={nextPage} disabled={name === null || name === ''} />}
        />
    );
}
