import { useFocusEffect } from '@react-navigation/native';
import { Typo } from '@reptile-region/design-system';
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
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
        textFieldRef.current?.focus();
    });

    const {
        entityDate: { weight },
        setCreateEntity,
    } = useCreateEntity();

    const handleChangeWeight = (text: string) => {
        const textSize = text.length;
        const reg = /^-?\d*(\.\d*)\.+$/;
        const dotRemoveText = reg.test(text) ? text.slice(0, textSize - 1) : text;
        const newText = dotRemoveText[0] === '.' ? '0' + text : dotRemoveText;
        setCreateEntity({ type: 'SET_WEIGHT', weight: newText });
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
                <View style={styles.container}>
                    <TextField
                        ref={textFieldRef}
                        label={'몸무게'}
                        size="large"
                        value={weight?.toString()}
                        onChangeText={handleChangeWeight}
                        keyboardType="numeric"
                    />
                    <Typo>g</Typo>
                </View>
            }
            button={
                <ConfirmButton text="다음" size={buttonSize} onPress={nextPage} disabled={weight === null || weight === ''} />
            }
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
});
