import { Typo, color } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Warning } from '@/assets/icons';

export default function ComingSoonBanner() {
    return (
        <View style={styles.container}>
            <Warning width={50} height={50} fill={color.Orange[750].toString()} />
            <View style={styles.textContainer}>
                <Typo variant="heading1">
                    서비스 준비중<Typo variant="heading1Light">입니다.</Typo>
                </Typo>
                <Typo variant="body4" textAlign="center">
                    {'이용에 불편을 드려 죄송합니다.\n' +
                        '보다 나은 서비스 제공을 위하여 페이지 준비중에 있습니다.\n' +
                        '빠른시일내에 준비하여 찾아뵙겠습니다.'}
                </Typo>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        backgroundColor: color.White.toString(),
    },
    textContainer: {
        alignItems: 'center',
        gap: 20,
    },
});
