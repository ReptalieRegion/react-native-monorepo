import { Typo } from 'design-system';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import useTagState from '@/hooks/useTagState';

const CommentTagListActivityIndicator = () => {
    const { keyword } = useTagState();
    return (
        <View style={styles.container}>
            <ActivityIndicator />
            <Typo variant="body2" color="placeholder">
                {keyword} 검색 중
            </Typo>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 15,
        padding: 20,
    },
});

export default CommentTagListActivityIndicator;
