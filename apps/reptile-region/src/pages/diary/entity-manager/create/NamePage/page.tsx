import dayjs from 'dayjs';
import React, { useCallback, useEffect, useRef } from 'react';
import type { TextInput } from 'react-native-gesture-handler';

import useCreateEntity from '@/apis/diary/entity-manager/hooks/mutations/useCreateEntity';
import { TextField } from '@/components/@common/atoms';
import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import useCreateEntityHandler from '@/components/diary/organisms/CreateEntity/hooks/useCreateEntity';
import CreateTemplate from '@/components/diary/templates/CreateTemplate/CreateTemplate';
import useKeyboardOpenButtonSize from '@/hooks/@common/useKeyboardOpenButtonSize';
import type { EntityManagerCreateNameScreenProps } from '@/types/routes/props/diary';

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
        console.log(entityDate);
        if (
            entityDate.image &&
            entityDate.gender &&
            entityDate.hatchingDate &&
            entityDate.name &&
            entityDate.variety.selected &&
            entityDate.weight
        ) {
            mutate({
                files: {
                    uri: entityDate.image.uri,
                    name: entityDate.image.name,
                    type: entityDate.image.type,
                },
                gender: entityDate.gender,
                hatching: entityDate.hatchingDate,
                name: entityDate.name,
                variety: entityDate.variety.selected,
                weight: {
                    date: dayjs().format(),
                    weight: entityDate.weight,
                },
            });
            navigation.navigate('congrats');
        }
    }, [entityDate, mutate, navigation]);

    useEffect(() => {
        textFieldRef.current?.focus();
    }, []);

    return (
        <CreateTemplate
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
