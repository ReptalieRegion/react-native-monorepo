import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

type ListFooterLoadingProps = {
    isLoading: boolean;
};

const ListFooterLoading = ({ isLoading }: ListFooterLoadingProps) => {
    return isLoading ? <ActivityIndicator size={'small'} style={styles.padding} /> : null;
};

const styles = StyleSheet.create({
    padding: {
        paddingTop: 10,
        paddingBottom: 10,
    },
});

export default ListFooterLoading;
