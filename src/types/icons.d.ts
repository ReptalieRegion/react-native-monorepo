declare module '<Icon>' {
    import { ColorValue } from 'react-native';
    import { NumberProp } from 'react-native-svg';

    interface IIconProps {
        width?: NumberProp;
        height?: NumberProp;
        fill?: ColorValue;
    }
}
