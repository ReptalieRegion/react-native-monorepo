import { Typo, color } from '@crawl/design-system';
import type { RenderFallbackType } from '@crawl/error-boundary';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Warning } from '@/assets/icons';

const PostDetailError: RenderFallbackType = () => {
    return (
        <View style={styles.wrapper}>
            <Warning width={50} height={50} fill={color.Orange[750].toString()} />
            <Typo variant="heading1">삭제된 게시물이예요</Typo>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.White.toString(),
        gap: 20,
    },
});

export default PostDetailError;
