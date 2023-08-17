import React from 'react';
import { StyleSheet, View } from 'react-native';

import PostWrite from '../atoms/PostWrite';
import ScrollToTopButton from '../atoms/ScrollToTopButton';

const FloatingActionButtons = () => {
    return (
        <View style={styles.buttonSize}>
            <ScrollToTopButton buttonSize={styles.buttonSize} />
            <PostWrite buttonSize={styles.buttonSize} />
        </View>
    );
};

const styles = StyleSheet.create({
    buttonSize: {
        width: 50,
        height: 50,
    },
});

export default FloatingActionButtons;
