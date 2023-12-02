import React from 'react';
import { StyleSheet, View } from 'react-native';

import { SuccessBadge } from '@/assets/icons';
import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import CreateTemplate from '@/components/diary/templates/CreateTemplate1/CreateTemplate';
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
                    <SuccessBadge width={150} height={150} />
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
});
