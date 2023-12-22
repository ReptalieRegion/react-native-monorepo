import { Typo, color } from '@crawl/design-system';
import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Female from '@/assets/icons/Female';
import Male from '@/assets/icons/Male';
import Question from '@/assets/icons/Question';
import { ConditionalRenderer } from '@/components/@common/atoms';
import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import CreateTemplate from '@/pages/diary/entity-manager/create/@common/components/CreateTemplate';
import useCreateEntity from '@/pages/diary/entity-manager/create/@common/context/CreateEntity/hooks/useCreateEntity';
import type { EntityGender } from '@/pages/diary/entity-manager/create/@common/context/CreateEntity/type';
import type { IconFunction } from '@/types/global/icons';
import type { EntityManagerCreateGenderScreenProps } from '@/types/routes/props/diary/entity';

type GenderMapItem = {
    text: string;
    gender: EntityGender;
    Icon: IconFunction;
    color: string;
};

const GENDER_MAP: GenderMapItem[] = [
    { text: '암컷', gender: 'Female', Icon: Female, color: color.Pink[500].toString() },
    { text: '수컷', gender: 'Male', Icon: Male, color: color.Blue[500].toString() },
    { text: '미구분', gender: 'Uncategorized', Icon: Question, color: color.Red[500].toString() },
];

export default function EntityManagerGenderPage({ navigation }: EntityManagerCreateGenderScreenProps) {
    const {
        entityDate: { gender },
        setCreateEntity,
    } = useCreateEntity();
    const isFocused = useIsFocused();

    const nextPage = () => {
        navigation.navigate('hatchingDay');
    };

    const handlePress = (selectedGender: EntityGender) => {
        setCreateEntity({ type: 'SET_GENDER', gender: selectedGender });
        nextPage();
    };

    return (
        <CreateTemplate
            title="성별을 선택해주세요."
            description="등록할 개체의 성별을 선택해주세요."
            contentsAlign="center"
            contents={
                <View style={styles.container}>
                    {GENDER_MAP.map(({ gender: selectedGender, Icon, color: genderColor, text }) => {
                        const isSelected = gender === selectedGender;
                        const selectedStyles = isSelected ? { borderColor: genderColor } : {};
                        const selectedIconStyles = isSelected ? genderColor : color.Gray[500].toString();
                        const selectedTextColor = isSelected ? 'default' : 'placeholder';

                        return (
                            <TouchableOpacity key={selectedGender} onPress={() => handlePress(selectedGender)}>
                                <View style={[styles.radioButtonContainer, selectedStyles]}>
                                    <Icon width={50} height={50} fill={selectedIconStyles} />
                                    <Typo variant="title2" color={selectedTextColor}>
                                        {text}
                                    </Typo>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            }
            button={
                <ConditionalRenderer
                    condition={isFocused && !!gender}
                    trueContent={<ConfirmButton size="medium" variant="confirm" text="다음" onPress={nextPage} />}
                />
            }
        />
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        gap: 20,
        paddingHorizontal: 20,
        minHeight: 100,
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioButtonContainer: {
        width: 100,
        alignItems: 'center',
        borderColor: color.Gray[500].toString(),
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
});
