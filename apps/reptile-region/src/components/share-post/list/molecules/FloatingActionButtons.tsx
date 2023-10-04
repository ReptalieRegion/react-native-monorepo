import React from 'react';
import { StyleSheet, View } from 'react-native';

import PostWrite from '../atoms/PostWrite';
import ScrollToTopButton from '../atoms/ScrollToTopButton';

import type { ScrollDirection, ScrollToTop } from '@/hooks/useFlashListScroll';

type FloatingActionButtonsProps = {
    animationMode: ScrollDirection;
    scrollToTop: ScrollToTop;
};

export default function FloatingActionButtons({ animationMode, scrollToTop }: FloatingActionButtonsProps) {
    return (
        <View style={[styles.container, styles.buttonSize]}>
            <ScrollToTopButton {...styles.buttonSize} animationMode={animationMode} scrollToTop={scrollToTop} />
            <PostWrite {...styles.buttonSize} />
        </View>
    );
}

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
