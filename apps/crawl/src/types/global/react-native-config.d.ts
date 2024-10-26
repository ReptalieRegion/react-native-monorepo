export type ModeType = 'test' | 'development' | 'production';

declare module 'react-native-config' {
    export interface NativeConfig {
        MODE_TYPE: ModeType;
        END_POINT_URI: string;
        WEB_PAGE_URI: string;
        KAKAO_SDK_API: string;
        ANDROID_GOOGLE_WEB_CLIENT_ID: string;
    }

    export const Config: NativeConfig;
    export default Config;
}
