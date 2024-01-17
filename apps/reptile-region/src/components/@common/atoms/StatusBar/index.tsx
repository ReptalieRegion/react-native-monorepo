import { color } from '@crawl/design-system';
import React from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const backgroundColor = __DEV__ ? color.White.toString() : Platform.select({ ios: color.White.toString(), android: undefined });

export default function MainStatusBar() {
    const { top } = useSafeAreaInsets();

    const CustomStatusBar = Platform.select({
        ios: <View style={[{ paddingTop: top, backgroundColor }]} />,
        android: <StatusBar barStyle={'light-content'} backgroundColor={backgroundColor} />,
        default: null,
    });

    return CustomStatusBar;
}
