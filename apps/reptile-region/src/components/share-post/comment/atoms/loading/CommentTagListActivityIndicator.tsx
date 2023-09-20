import { Typo, color } from 'design-system';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTagSearch } from 'tag-text-input';

const CommentTagListActivityIndicator = () => {
    const { keyword } = useTagSearch();

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
        position: 'absolute',
        top: 0,
        left: 0,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 15,
        padding: 20,
        backgroundColor: color.White.toString(),
        width: '100%',
        height: '100%',
    },
});

export default CommentTagListActivityIndicator;
