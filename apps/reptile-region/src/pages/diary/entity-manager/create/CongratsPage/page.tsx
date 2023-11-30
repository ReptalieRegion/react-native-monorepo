import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { TextButton } from '@/components/@common/atoms';
import CreateTemplate from '@/components/diary/templates/CreateTemplate/CreateTemplate';
import type { EntityManagerCreateCongratsScreenProps } from '@/types/routes/props/diary';

export default function EntityManagerCongratsPage({ navigation }: EntityManagerCreateCongratsScreenProps) {
    const nextPage = () => {
        navigation.navigate('bottom-tab/routes', {
            screen: 'tab',
            params: {
                screen: 'diary/routes',
                params: {
                    screen: 'entity-manager',
                    params: {
                        screen: 'entity-manager/list',
                    },
                },
            },
        });
    };

    return (
        <CreateTemplate
            title="등록이 완료되었어요."
            description=""
            contents={
                <>
                    <View>
                        <Text style={styles.text}>🎉</Text>
                    </View>
                    <TextButton text="완료" type="view" color="surface" onPress={nextPage} />
                </>
            }
        />
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 100,
        textAlign: 'center',
        margin: 40,
    },
});
