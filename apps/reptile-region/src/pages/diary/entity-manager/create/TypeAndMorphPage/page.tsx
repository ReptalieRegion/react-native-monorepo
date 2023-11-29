import { TouchableTypo } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import type { EntityManagerCreateTypeAndMorphScreenProps } from '@/types/routes/props/diary';

export default function EntityManagerTypeAndMorphPage({ navigation }: EntityManagerCreateTypeAndMorphScreenProps) {
    const nextPage = () => {
        navigation.navigate('weight');
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
