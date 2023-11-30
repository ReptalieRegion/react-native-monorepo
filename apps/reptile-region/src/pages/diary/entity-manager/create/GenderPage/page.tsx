import { Typo } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useCreateEntity from '@/components/diary/organisms/CreateEntity/hooks/useCreateEntity';
import type { EntityGender } from '@/components/diary/organisms/CreateEntity/type';
import CreateTemplate from '@/components/diary/templates/CreateTemplate/CreateTemplate';
import type { EntityManagerCreateGenderScreenProps } from '@/types/routes/props/diary';

type GenderMapItem = {
    text: string;
    gender: EntityGender;
};

const GENDER_MAP: GenderMapItem[] = [
    { text: '암컷', gender: 'Female' },
    { text: '수컷', gender: 'Male' },
    { text: '미구분', gender: 'Uncategorized' },
];

export default function EntityManagerGenderPage({ navigation }: EntityManagerCreateGenderScreenProps) {
    const { setCreateEntity } = useCreateEntity();
    const { width } = useWindowDimensions();

    const handlePress = (gender: EntityGender) => {
        setCreateEntity({ type: 'SET_GENDER', gender });
        navigation.navigate('hatchingDay');
    };

    return (
        <CreateTemplate
            title="성별을 선택해주세요."
            description="등록할 개체의 성별을 선택해주세요."
            contents={
                <View style={styles.row}>
                    {GENDER_MAP.map(({ text, gender }) => (
                        <TouchableOpacity
                            key={gender}
                            style={styles.iconContainer}
                            containerStyle={[styles.iconItem, { width: (width - 40) / GENDER_MAP.length }]}
                            onPress={() => handlePress(gender)}
                        >
                            <Typo variant="title3" textAlign="center" textAlignVertical="center">
                                {text}
                            </Typo>
                        </TouchableOpacity>
                    ))}
                </View>
            }
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
