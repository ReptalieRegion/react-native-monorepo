import React from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ENV from '@/env';

const iosBackground = ENV.isProd ? 'white' : ENV.isDev ? 'red' : ENV.isLocal ? 'green' : 'black';
const androidBackground = ENV.isProd ? undefined : ENV.isDev ? 'red' : ENV.isLocal ? 'green' : 'black';

const MainStatusBar = () => {
    const { top } = useSafeAreaInsets();
    const isIOS = Platform.OS === 'ios';
    const isAndroid = Platform.OS === 'android';

    if (isIOS) {
        return <View style={[{ paddingTop: top, backgroundColor: iosBackground }]} />;
    }

    if (isAndroid) {
        return <StatusBar barStyle={'light-content'} backgroundColor={androidBackground} />;
    }

    return null;
};

export default MainStatusBar;
