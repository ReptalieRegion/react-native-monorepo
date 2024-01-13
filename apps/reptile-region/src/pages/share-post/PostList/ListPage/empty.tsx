import { Typo } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function EmptyPost() {
    return (
        <View style={styles.container}>
            <Typo variant="heading2">아직 게시물이 없어요</Typo>
            <Typo variant="body2" color="placeholder">
                처음으로 게시물을 남겨보는건 어때요?
            </Typo>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        gap: 10,
        alignItems: 'center',
    },
});
