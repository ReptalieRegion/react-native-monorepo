import { Typo } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function EmptyComment() {
    return (
        <View style={styles.container}>
            <Typo variant="heading2">아직 댓글이 없어요</Typo>
            <Typo variant="body3" color="placeholder">
                댓글을 남겨보는건 어때요?
            </Typo>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 60,
        gap: 10,
    },
});
