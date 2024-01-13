import React, { useCallback, useRef } from 'react';
import type { TextInput } from 'react-native-gesture-handler';

import CreateTextFieldTemplate from '../@common/components/CreateTextFieldTemplate';
import useCreateEntityHandler from '../@common/context/CreateEntity/hooks/useCreateEntity';

import useCreateEntity from '@/apis/diary/entity-manager/hooks/mutations/useCreateEntity';
import { TextField } from '@/components/@common/atoms';
import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import useKeyboardOpenButtonSize from '@/hooks/useKeyboardOpenButtonSize';
import type { EntityManagerCreateNameScreenProps } from '@/types/routes/props/diary/entity';

export default function EntityManagerNamePage({ navigation }: EntityManagerCreateNameScreenProps) {
    const textFieldRef = useRef<TextInput>(null);
    const buttonSize = useKeyboardOpenButtonSize();
    const { mutate } = useCreateEntity();

    const { entityDate, setCreateEntity } = useCreateEntityHandler();

    const handleChangeName = useCallback(
        (text: string) => {
            setCreateEntity({ type: 'SET_NAME', name: text });
        },
        [setCreateEntity],
    );

    const nextPage = useCallback(() => {
        if (
            !entityDate.image ||
            !entityDate.gender ||
            !entityDate.name ||
            !entityDate.variety ||
            !entityDate.weightUnit ||
            entityDate.hatchingDate === null
        ) {
            return;
        }

        const { gender, hatchingDate, image, name, variety, weightUnit } = entityDate;

        mutate({
            files: { uri: image.uri, name: image.name, type: image.type },
            gender,
            hatching: hatchingDate,
            name,
            variety,
            weightUnit,
        });
        navigation.navigate('congrats');
    }, [entityDate, mutate, navigation]);

    return (
        <CreateTextFieldTemplate
            title="개체의 이름을 등록해주세요."
            description="현재 개체의 이름을 알려주세요."
            contentsAlign="top"
            contents={
                <TextField
                    ref={textFieldRef}
                    label={'이름'}
                    size="large"
                    value={entityDate.name ?? ''}
                    onChangeText={handleChangeName}
                    autoFocus
                />
            }
            button={
                <ConfirmButton
                    text="다음"
                    size={buttonSize}
                    onPress={nextPage}
                    disabled={entityDate.name === null || entityDate.name === ''}
                />
            }
        />
    );
}
