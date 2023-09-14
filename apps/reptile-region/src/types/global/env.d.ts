declare module '@env' {
    export type ModeType = 'test' | 'development' | 'production';
    export const NODE_ENV: ModeType;
    export const HOME_PAGE_URI: string;
    export const END_POINT_URI: string;
}
