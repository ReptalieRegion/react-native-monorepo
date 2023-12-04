import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
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
                <View style={styles.container}>
                    {/* <SuccessBadge width={150} height={150} /> */}
                    <Text style={styles.text}>🎉</Text>
                </View>
            }
            button={<ConfirmButton text="목록으로" onPress={nextPage} />}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 100,
    },
});
