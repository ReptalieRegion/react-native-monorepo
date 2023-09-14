declare module '<Icon>' {
    import { JSX } from 'react';
    import { ColorValue } from 'react-native';
    import { NumberProp } from 'react-native-svg';

    interface IconProps {
        width?: NumberProp;
        height?: NumberProp;
        fill?: ColorValue;
        stroke?: ColorValue | undefined;
    }

    type IconFunction = (props: IconProps) => JSX.Element;
}
