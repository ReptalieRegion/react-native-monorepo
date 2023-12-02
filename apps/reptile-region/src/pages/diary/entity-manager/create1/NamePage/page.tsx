import { color } from '@reptile-region/design-system';
import React, { useCallback } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import useCreateEntity from '@/components/diary/organisms/CreateEntity/hooks/useCreateEntity';
import CreateTemplate from '@/components/diary/templates/CreateTemplate1/CreateTemplate';
import type { EntityManagerCreateNameScreenProps } from '@/types/routes/props/diary';

export default function EntityManagerNamePage({ navigation }: EntityManagerCreateNameScreenProps) {
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

    return (
        <CreateTemplate
            title="개체의 이름을 등록해주세요."
            description="현재 개체의 이름을 알려주세요."
            contents={
                <View style={styles.textView}>
                    <TextInput value={name ?? ''} onChangeText={handleChangeName} />
                </View>
            }
            button={<ConfirmButton text="다음" onPress={nextPage} disabled={name === null || name === ''} />}
        />
    );
}

const styles = StyleSheet.create({
    textView: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: color.Gray[500].toString(),
        padding: 10,
        paddingVertical: 10,
        borderRadius: 10,
    },
});
