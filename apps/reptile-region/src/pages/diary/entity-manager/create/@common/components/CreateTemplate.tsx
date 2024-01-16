import { Typo, color } from '@crawl/design-system';
import React, { useCallback, useMemo, useState, type ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Platform, StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { type TitleAndDescriptionProps } from './TitleAndDescription';

import { HEADER_HEIGHT } from '@/constants/global';

type CreateTemplateState = {
    contents: ReactNode;
    button?: ReactNode;
    contentsAlign?: 'center' | 'top';
};

type CreateTemplateProps = CreateTemplateState & TitleAndDescriptionProps;

export default function CreateTemplate({ title, contents, button, contentsAlign = 'center' }: CreateTemplateProps) {
    const { bottom } = useSafeAreaInsets();
    const [titleHeight, setTitleHeight] = useState(bottom + HEADER_HEIGHT);

    const buttonStyle = useMemo(
        () => [styles.button, { bottom: Platform.select({ ios: bottom === 0 ? 10 : bottom, android: bottom + 10 }) }],
        [bottom],
    );

    const contentsStyle: StyleProp<ViewStyle> = useMemo(
        () => [contentsAlign === 'center' ? styles.contentCenter : styles.contentTop, { paddingBottom: titleHeight }],
        [contentsAlign, titleHeight],
    );

    const handleLayout = useCallback((event: LayoutChangeEvent) => {
        setTitleHeight(event.nativeEvent.layout.height);
    }, []);

    return (
        <View style={styles.wrapper}>
            <View style={styles.title} onLayout={handleLayout}>
                <Typo variant="heading1">{title}</Typo>
            </View>
            <View style={contentsStyle}>{contents}</View>
            <View style={buttonStyle}>{button}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: color.White.toString(),
    },
    title: {
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    contentCenter: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: -20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentTop: {
        flex: 1,
        paddingHorizontal: 20,
    },
    button: {
        width: '100%',
        position: 'absolute',
        alignItems: 'center',
        backgroundColor: color.White.toString(),
    },
});
