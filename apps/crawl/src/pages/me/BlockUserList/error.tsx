import { Typo, color } from '@crawl/design-system';
import type { RenderFallbackProps } from '@crawl/error-boundary';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Error } from '@/assets/icons';
import { 이메일_1대1문의 } from '@/env/constants';

export default function BlockUserListError({}: RenderFallbackProps) {
    return (
        <View style={styles.wrapper}>
            <Error width={70} height={70} fill={color.Red.A700.toString()} />
            <View style={styles.textContainer}>
                <Typo variant="heading1" textAlign="center">
                    {'알 수 없는 이유로' + '\n차단 목록을 불러올 수 없습니다.'}
                </Typo>
                <Typo variant="body4" textAlign="center">
                    {'이용에 불편을 드려 죄송합니다.\n'}
                    <Typo variant="title6">{이메일_1대1문의}</Typo>
                    으로 문의해 주세요.
                </Typo>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    wrapper: {
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
