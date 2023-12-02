import React, { useCallback, useEffect, useRef } from 'react';
import type { TextInput } from 'react-native-gesture-handler';

import { TextField } from '@/components/@common/atoms';
import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import useCreateEntity from '@/components/diary/organisms/CreateEntity/hooks/useCreateEntity';
import CreateTemplate from '@/components/diary/templates/CreateTemplate/CreateTemplate';
import useKeyboardOpenButtonSize from '@/hooks/@common/useKeyboardOpenButtonSize';
import type { EntityManagerCreateNameScreenProps } from '@/types/routes/props/diary';

export default function EntityManagerNamePage({ navigation }: EntityManagerCreateNameScreenProps) {
    const textFieldRef = useRef<TextInput>(null);
    const buttonSize = useKeyboardOpenButtonSize();
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

    useEffect(() => {
        textFieldRef.current?.focus();
    }, []);

    return (
        <CreateTemplate
            title="개체의 이름을 등록해주세요."
            description="현재 개체의 이름을 알려주세요."
            contentsAlign="top"
            contents={
                <TextField ref={textFieldRef} label={'이름'} size="large" value={name ?? ''} onChangeText={handleChangeName} />
            }
            button={<ConfirmButton text="다음" size={buttonSize} onPress={nextPage} disabled={name === null || name === ''} />}
        />
    );
}
