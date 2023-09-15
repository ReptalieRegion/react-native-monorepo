import { Image, ImageProps } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type AvatarProps = Omit<ImageProps, 'style' | 'recyclingKey'> & {
    recyclingKey?: string;
    size?: number;
    onPress?: () => void;
};

type Size = {
    width: number;
    height: number;
};

const Avatar = ({ size = 30, recyclingKey, onPress, ...rest }: AvatarProps) => {
    const sizeStyle: Size = { width: size, height: size };

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.3}>
            <Image
                {...rest}
                recyclingKey={recyclingKey}
                style={[sizeStyle, styles.circle]}
                placeholderContentFit="cover"
                placeholder={require('../../../assets/images/avatar.png')}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    circle: {
        borderRadius: 9999,
    },
});

export default Avatar;
