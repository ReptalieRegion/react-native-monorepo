import { color } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Female from '@/assets/icons/Female';
import Male from '@/assets/icons/Male';
import TitleAndDescription from '@/components/diary/TitleAndDescription/TitleAndDescription';
import type { EntityManagerCreateGenderScreenProps } from '@/types/routes/props/diary';

export default function EntityManagerGenderPage({ navigation }: EntityManagerCreateGenderScreenProps) {
    const nextPage = () => {
        navigation.navigate('hatchingDay');
    };

    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <TitleAndDescription title="성별을 선택해주세요." description="등록할 개체의 성별을 선택해주세요." />
                <View style={styles.row}>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={nextPage}>
                            <Female width={100} height={100} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={nextPage}>
                            <Male width={100} height={100} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.White.toString(),
    },
    item: {
        height: 400,
        justifyContent: 'flex-start',
        gap: 40,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        flex: 1,
        alignItems: 'center',
    },
});
