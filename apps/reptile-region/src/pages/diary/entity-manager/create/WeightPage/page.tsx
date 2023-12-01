import { Typo, color } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import useCreateEntity from '@/components/diary/organisms/CreateEntity/hooks/useCreateEntity';
import CreateTemplate from '@/components/diary/templates/CreateTemplate/CreateTemplate';
import useKeyboardOpenButtonSize from '@/hooks/@common/useKeyboardOpenButtonSize';
import type { EntityManagerCreateWeightScreenProps } from '@/types/routes/props/diary';

export default function EntityManagerWeightPage({ navigation }: EntityManagerCreateWeightScreenProps) {
    const buttonSize = useKeyboardOpenButtonSize();

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
                <View style={styles.textView}>
                    <View style={styles.textInput}>
                        <TextInput
                            value={weight?.toString()}
                            keyboardType="numeric"
                            onChangeText={handleChangeWeight}
                            autoFocus
                        />
                    </View>
                    <View style={styles.text}>
                        <Typo>g</Typo>
                    </View>
                </View>
            }
            button={
                <ConfirmButton text="다음" size={buttonSize} onPress={nextPage} disabled={weight === null || weight === ''} />
            }
        />
    );
}

const styles = StyleSheet.create({
    textView: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: color.Gray[500].toString(),
        padding: 10,
        borderRadius: 10,
    },
    textInput: {
        flex: 1,
    },
    text: {
        marginLeft: 'auto',
        paddingLeft: 10,
    },
});
