import { Image, ImageProps } from 'expo-image';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type AvatarProps = Omit<ImageProps, 'style'> & {
    size?: number;
    showAnimated?: boolean;
};

type Size = {
    width: number;
    height: number;
};

const DefaultAvatar = ({ sizeStyle }: { sizeStyle: Size }) => {
    return <Image style={[styles.size, sizeStyle]} placeholder={require('../../../assets/images/avatar.png')} />;
};

const Avatar = ({ size = 30, showAnimated, ...rest }: AvatarProps) => {
    const opacity = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
    const sizeStyle: Size = { width: size, height: size };
    if (showAnimated) {
        opacity.value = 1;
    }

    const onLoad = () => {
        opacity.value = withSpring(1);
    };

    useEffect(() => {
        if (showAnimated) {
            opacity.value = 0;
        }
    }, [showAnimated, opacity, rest.source]);

    return (
        <View style={[styles.container, styles.circle, sizeStyle]}>
            <DefaultAvatar sizeStyle={sizeStyle} />
            <Animated.View style={[styles.imageContainer, animatedStyle]}>
                <Image {...rest} style={[styles.size, sizeStyle]} onLoad={onLoad} />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 30,
        height: 30,
        position: 'relative',
        overflow: 'hidden',
    },
    size: {
        width: 30,
        height: 30,
    },
    circle: {
        borderRadius: 9999,
    },
    imageContainer: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default Avatar;
