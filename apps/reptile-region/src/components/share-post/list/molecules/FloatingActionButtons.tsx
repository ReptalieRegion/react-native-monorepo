import React from 'react';
import { StyleSheet, View } from 'react-native';

import PostWrite from '../atoms/PostWrite';
import ScrollToTopButton, { ScrollTopButtonProps } from '../atoms/ScrollToTopButton';

type FloatingActionButtonsProps = ScrollTopButtonProps;

const FloatingActionButtons = ({ animationMode, scrollIntoView }: FloatingActionButtonsProps) => {
    return (
        <View style={[styles.container, styles.buttonSize]}>
            <ScrollToTopButton {...styles.buttonSize} animationMode={animationMode} scrollIntoView={scrollIntoView} />
            <PostWrite {...styles.buttonSize} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 20,
        bottom: 20,
    },
    buttonSize: {
        width: 50,
        height: 50,
    },
});

export default FloatingActionButtons;
