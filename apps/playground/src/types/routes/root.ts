import type { NavigatorScreenParams } from '@react-navigation/native';

import type { BottomTabParamList } from './bottom-tab';

export type RootRoutesParamList = {
    바텀탭: NavigatorScreenParams<BottomTabParamList>;
};
