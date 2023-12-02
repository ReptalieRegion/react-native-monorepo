import { useFocusEffect } from '@react-navigation/native';
import React, { useRef } from 'react';
import { TextInput } from 'react-native-gesture-handler';

import { TextField } from '@/components/@common/atoms';
import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import useCreateEntity from '@/components/diary/organisms/CreateEntity/hooks/useCreateEntity';
import CreateTemplate from '@/components/diary/templates/CreateTemplate/CreateTemplate';
import useKeyboardOpenButtonSize from '@/hooks/@common/useKeyboardOpenButtonSize';
import type { EntityManagerCreateWeightScreenProps } from '@/types/routes/props/diary';

export default function EntityManagerWeightPage({ navigation }: EntityManagerCreateWeightScreenProps) {
    const textFieldRef = useRef<TextInput>(null);
    const buttonSize = useKeyboardOpenButtonSize();

    useFocusEffect(() => {
        setTimeout(() => textFieldRef.current?.focus(), 1000);
    });

    const {
        entityDate: { weight },
        setCreateEntity,
    } = useCreateEntity();

    const handleChangeWeight = (text: string) => {
        setCreateEntity({ type: 'SET_WEIGHT', weight: text });
    };

    const nextPage = () => {
        navigation.navigate('name');
    };

    return (
        <CreateTemplate
            title="개체의 몸무게를 등록해주세요."
            description="현재 개체의 종류와 모프를 알려주세요."
            contentsAlign="top"
            contents={
                <TextField
                    ref={textFieldRef}
                    label={'몸무게'}
                    size="large"
                    value={weight?.toString()}
                    onChangeText={handleChangeWeight}
                    keyboardType="numeric"
                />
            }
            button={
                <ConfirmButton text="다음" size={buttonSize} onPress={nextPage} disabled={weight === null || weight === ''} />
            }
        />
    );
}
