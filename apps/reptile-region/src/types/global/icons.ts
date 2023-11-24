import type React from 'react';
import type { ColorValue } from 'react-native';
import type { NumberProp } from 'react-native-svg';

interface IconProps {
    width?: NumberProp;
    height?: NumberProp;
    fill?: ColorValue;
    stroke?: ColorValue | undefined;
}

type IconFunction = (props: IconProps) => React.JSX.Element;

export type { IconFunction, IconProps };
