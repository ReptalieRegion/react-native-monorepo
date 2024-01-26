import { color } from '@crawl/design-system';
import React, { useMemo, type PropsWithChildren } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

type PageWrapperState = {
    style?: ViewStyle;
};

export default function PageWrapper({ children, style }: PropsWithChildren<PageWrapperState>) {
    const wrapperStyle = useMemo(() => [styles.wrapper, style], [style]);
    return <View style={wrapperStyle}>{children}</View>;
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
});
