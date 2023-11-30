import { color } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { TextButton } from '@/components/@common/atoms';
import TitleAndDescription from '@/components/diary/TitleAndDescription/TitleAndDescription';
import type { EntityManagerCreateTypeAndMorphScreenProps } from '@/types/routes/props/diary';

export default function EntityManagerTypeAndMorphPage({}: EntityManagerCreateTypeAndMorphScreenProps) {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.item}>
                    <TitleAndDescription
                        title="종류와 모프를 선택해주세요."
                        description="현재 개체의 종류와 모프를 알려주세요."
                    />
                    <TextButton text="" type="outline" />
                </View>
            </View>
        </>
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
        width: 250,
        justifyContent: 'flex-start',
        gap: 20,
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
