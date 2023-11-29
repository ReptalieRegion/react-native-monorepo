import { TouchableTypo } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

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
        <View style={styles.container}>
            <TouchableTypo onPress={nextPage}>다음</TouchableTypo>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
