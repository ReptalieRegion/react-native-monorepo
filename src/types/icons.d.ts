declare module '<Icon>' {
    import { JSX } from 'react';
    import { ColorValue } from 'react-native';
    import { NumberProp } from 'react-native-svg';

    interface IIconProps {
        width?: NumberProp;
        height?: NumberProp;
        fill?: ColorValue;
        stroke?: ColorValue | undefined;
    }

    type IIcon = (props: IIconProps) => JSX.Element;
}
