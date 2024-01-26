declare module '@env' {
    export type ModeType = 'test' | 'development' | 'production';
    export const NODE_ENV: ModeType;
    export const END_POINT_URI: string;
    export const WEB_PAGE_URI: string;
}
