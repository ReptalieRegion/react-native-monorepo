import { ViewStyle } from 'react-native';

export type DotMapType = 'leftTop' | 'top' | 'rightTop' | 'right' | 'rightBottom' | 'bottom' | 'leftBottom' | 'left';

export type DotStyles = {
    [key in DotMapType]: Pick<ViewStyle, 'top' | 'left'>;
};

export type DotTranslateMap = {
    [key in DotMapType]: {
        translateX: number;
        translateY: number;
    };
};
