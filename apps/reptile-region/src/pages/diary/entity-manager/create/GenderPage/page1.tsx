import { color } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Female from '@/assets/icons/Female';
import Male from '@/assets/icons/Male';
import Question from '@/assets/icons/Question';
import { ConditionalRenderer } from '@/components/@common/atoms';
import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import useCreateEntity from '@/components/diary/organisms/CreateEntity/hooks/useCreateEntity';
import type { EntityGender } from '@/components/diary/organisms/CreateEntity/type';
import CreateTemplate from '@/components/diary/templates/CreateTemplate/CreateTemplate1';
import type { IconFunction } from '@/types/global/icons';
import type { EntityManagerCreateGenderScreenProps } from '@/types/routes/props/diary';

type GenderMapItem = {
    text: string;
    gender: EntityGender;
    Icon: IconFunction;
    color: string;
};

const GENDER_MAP: GenderMapItem[] = [
    { text: '암컷', gender: 'Female', Icon: Female, color: color.Pink[500].toString() },
    { text: '수컷', gender: 'Male', Icon: Male, color: color.Blue[500].toString() },
    { text: '미구분', gender: 'Uncategorized', Icon: Question, color: color.Gray[500].toString() },
];

export default function EntityManagerGenderPage({ navigation }: EntityManagerCreateGenderScreenProps) {
    const {
        entityDate: { gender },
        setCreateEntity,
    } = useCreateEntity();

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
            contents={
                <View style={styles.row}>
                    {GENDER_MAP.map(({ gender: selectedGender, Icon, color: genderColor }) => {
                        const isSelected = gender === selectedGender;
                        const selectedStyles = isSelected ? { borderWidth: 1, borderColor: genderColor, borderRadius: 10 } : {};
                        const selectedIconStyles = isSelected ? genderColor : undefined;
                        return (
                            <TouchableOpacity
                                key={selectedGender}
                                style={selectedStyles}
                                onPress={() => handlePress(selectedGender)}
                            >
                                <Icon width={100} height={100} fill={selectedIconStyles} />
                            </TouchableOpacity>
                        );
                    })}
                </View>
            }
            button={<ConditionalRenderer condition={!!gender} trueContent={<ConfirmButton text="다음" onPress={nextPage} />} />}
        />
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        paddingHorizontal: 20,
    },
    iconContainer: {
        flex: 1,
    },
    iconItem: {
        height: 20,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
