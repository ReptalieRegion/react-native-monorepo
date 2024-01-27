import { color } from '@crawl/design-system';
import React from 'react';
import { Platform, StatusBar, View } from 'react-native';
import Config from 'react-native-config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const backgroundColor =
    Config.MODE_TYPE === 'development'
        ? color.Red[500].toString()
        : Config.MODE_TYPE === 'test'
          ? color.Green[500].toString()
          : Platform.select({ ios: color.White.toString(), android: undefined });

export default function MainStatusBar() {
    const { top } = useSafeAreaInsets();

    const CustomStatusBar = Platform.select({
        ios: <View style={[{ paddingTop: top, backgroundColor }]} />,
        android: <StatusBar barStyle={'light-content'} backgroundColor={backgroundColor} />,
        default: null,
    });

    return CustomStatusBar;
}
