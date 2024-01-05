import { color } from '@crawl/design-system';
import React from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ENV from '@/env';

const backgroundColor = ENV.isProd ? undefined : ENV.isDev ? 'red' : ENV.isLocal ? undefined : color.DarkGray[500].toString();

export default function MainStatusBar() {
    const { top } = useSafeAreaInsets();

    const CustomStatusBar = Platform.select({
        ios: <View style={[{ paddingTop: top, backgroundColor }]} />,
        android: <StatusBar barStyle={'light-content'} backgroundColor={backgroundColor} />,
        default: null,
    });

    return CustomStatusBar;
}
