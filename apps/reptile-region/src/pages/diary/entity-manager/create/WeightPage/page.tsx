import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { Typo, color } from '@reptile-region/design-system';
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import { ConditionalRenderer } from '@/components/@common/atoms';
import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import useCreateEntity from '@/components/diary/organisms/CreateEntity/hooks/useCreateEntity';
import CreateTemplate from '@/components/diary/templates/CreateTemplate/CreateTemplate';
import useKeyboardOpenButtonSize from '@/hooks/@common/useKeyboardOpenButtonSize';
import type { WeightUnit } from '@/types/apis/diary/entity';
import type { EntityManagerCreateWeightScreenProps } from '@/types/routes/props/diary';

export default function EntityManagerWeightPage({ navigation }: EntityManagerCreateWeightScreenProps) {
    const textFieldRef = useRef<TextInput>(null);
    const buttonSize = useKeyboardOpenButtonSize();
    const isFocused = useIsFocused();

    useFocusEffect(() => {
        textFieldRef.current?.focus();
    });

    const {
        entityDate: { weightUnit },
        setCreateEntity,
    } = useCreateEntity();

    const nextPage = () => {
        navigation.navigate('name');
    };

    const handleChangeWeight = (selectedWeightUnit: WeightUnit) => {
        nextPage();
        setCreateEntity({ type: 'SET_WEIGHT', weightUnit: selectedWeightUnit });
    };

    return (
        <CreateTemplate
            title="무게 입력 단위를 설정해주세요"
            description="무게 추가는 상세 페이지에서 할 수 있어요"
            contentsAlign="center"
            contents={
                <View style={styles.container}>
                    {/* TODO Radio Button 컴포넌트로 분리 */}
                    <TouchableOpacity
                        style={styles.radioButton}
                        containerStyle={[
                            styles.radioButtonContainer,
                            { borderColor: weightUnit === 'g' ? color.Teal[150].toString() : color.Gray[500].toString() },
                        ]}
                        onPress={() => handleChangeWeight('g')}
                    >
                        <Typo textAlign="center" variant="title2" color={weightUnit === 'g' ? 'primary' : 'placeholder'}>
                            g
                        </Typo>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.radioButton}
                        containerStyle={[
                            styles.radioButtonContainer,
                            { borderColor: weightUnit === 'kg' ? color.Teal[150].toString() : color.Gray[500].toString() },
                        ]}
                        onPress={() => handleChangeWeight('kg')}
                    >
                        <Typo textAlign="center" variant="title2" color={weightUnit === 'kg' ? 'primary' : 'placeholder'}>
                            kg
                        </Typo>
                    </TouchableOpacity>
                </View>
            }
            button={
                <ConditionalRenderer
                    condition={isFocused && !!weightUnit}
                    trueContent={<ConfirmButton text="다음" size={buttonSize} onPress={nextPage} />}
                    falseContent={null}
                />
            }
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 30,
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButton: {
        padding: 10,
    },
    radioButtonContainer: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
    },
});
