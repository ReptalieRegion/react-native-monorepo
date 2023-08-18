import React from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { color } from '@/components/common/tokens/colors';
import ENV from '@/env';

const backgroundColor = ENV.isProd
    ? undefined
    : ENV.isDev
    ? 'red'
    : ENV.isLocal
    ? color.Green[500].toString()
    : color.Black.toString();

const MainStatusBar = () => {
    const { top } = useSafeAreaInsets();
    const isIOS = Platform.OS === 'ios';
    const isAndroid = Platform.OS === 'android';

    if (isIOS) {
        return <View style={[{ paddingTop: top, backgroundColor }]} />;
    }

    if (isAndroid) {
        return <StatusBar barStyle={'light-content'} backgroundColor={backgroundColor} />;
    }

    return null;
};

export default MainStatusBar;