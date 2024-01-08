import { Platform } from 'react-native';

export const isAndroid = Platform.OS === 'android';

export const isAboveIOS14 =
    Platform.OS === 'ios' && typeof Platform.Version === 'number' ? Platform.Version > 14 : Number(Platform.Version) > 14;
