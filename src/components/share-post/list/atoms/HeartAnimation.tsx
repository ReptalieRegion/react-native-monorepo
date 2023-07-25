import React, { useEffect, useRef } from 'react';
import LikeIcon from '@/assets/icons/Like';
import { Animated, StyleSheet } from 'react-native';
import { color } from '@/components/common/tokens/colors';

interface IHeartAnimationProps {
    startLike: boolean;
    onAnimationEnd: () => void;
}

type TDotMap = 'leftTop' | 'top' | 'rightTop' | 'right' | 'rightBottom' | 'bottom' | 'leftBottom' | 'left';
const DOT_MAP: TDotMap[] = ['leftTop', 'top', 'rightTop', 'right', 'rightBottom', 'bottom', 'leftBottom', 'left'];

interface IAnimateTranslate {
    scale: Animated.Value;
    translateX: Animated.Value;
    translateY: Animated.Value;
}

const iconSize = 55;
const dotSize = 10;
const halfDotSize = dotSize * 0.5;
const halfIconSize = iconSize * 0.5;

const HeartAnimation = ({ onAnimationEnd }: IHeartAnimationProps) => {
    const test = () => {
        let animates: { [key: string]: IAnimateTranslate } = {};
        for (const dot of DOT_MAP) {
            animates = {
                ...animates,
                [dot]: {
                    scale: new Animated.Value(1),
                    translateX: new Animated.Value(-halfDotSize),
                    translateY: new Animated.Value(0),
                },
            };
        }
        return animates;
    };
    const scaleValues = useRef(test()).current;
    const hearScaleValue = useRef(new Animated.Value(1.5)).current;

    useEffect(() => {
        const heartScale = () => {
            return Animated.sequence([
                Animated.timing(hearScaleValue, {
                    toValue: 2.1,
                    duration: 140,
                    useNativeDriver: true,
                }),
                Animated.timing(hearScaleValue, {
                    toValue: 1.8,
                    duration: 140,
                    useNativeDriver: true,
                }),
                Animated.delay(420),
            ]);
        };

        const animation = (props: any) => {
            const { target } = props;
            return Animated.parallel([
                Animated.timing(scaleValues[target].scale, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleValues[target].translateY, {
                    toValue: props.toValue.translateY,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleValues[target].translateX, {
                    toValue: props.toValue.translateX,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]);
        };

        const rally = () => {
            return Animated.parallel([
                heartScale(),
                animation({
                    target: 'leftTop',
                    toValue: {
                        translateX: -halfDotSize,
                        translateY: -halfDotSize,
                    },
                }),
                animation({
                    target: 'top',
                    toValue: {
                        translateY: -halfDotSize,
                    },
                }),
                animation({
                    target: 'rightTop',
                    toValue: {
                        translateX: halfDotSize,
                        translateY: -halfDotSize,
                    },
                }),
                animation({
                    target: 'right',
                    toValue: {
                        translateX: halfDotSize,
                    },
                }),
                animation({
                    target: 'rightBottom',
                    toValue: {
                        translateX: halfDotSize,
                        translateY: halfDotSize,
                    },
                }),
                animation({
                    target: 'bottom',
                    toValue: {
                        translateY: halfDotSize,
                    },
                }),
                animation({
                    target: 'leftBottom',
                    toValue: {
                        translateX: -halfDotSize,
                        translateY: halfDotSize,
                    },
                }),
                animation({
                    target: 'left',
                    toValue: {
                        translateX: -halfDotSize,
                    },
                }),
            ]);
        };
        rally().start(({ finished }) => {
            if (finished) {
                onAnimationEnd();
            }
        });
    }, [hearScaleValue, onAnimationEnd, scaleValues]);

    const dynamicStyles = StyleSheet.create({
        leftTop: {
            left: '35%',
            top: '28%',
        },
        top: {
            left: '50%',
            top: '25%',
        },
        rightTop: {
            left: '65%',
            top: '28%',
        },
        right: {
            left: '72%',
            top: '42%',
        },
        rightBottom: {
            left: '65%',
            top: '60%',
        },
        bottom: {
            left: '50%',
            top: '70%',
        },
        leftBottom: {
            left: '35%',
            top: '60%',
        },
        left: {
            left: '28%',
            top: '42%',
        },
        center: {
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: [{ translateX: -halfIconSize }, { translateY: -halfIconSize }, { scale: 1.5 }],
        },
        dot: {
            position: 'absolute',
            width: 10,
            height: 10,
            borderRadius: 9999,
            backgroundColor: color.Red[500].toString(),
            transform: [{ translateX: -halfDotSize }],
        },
    });

    return (
        <>
            {DOT_MAP.map((dotName) => {
                const { scale, translateX, translateY } = scaleValues[dotName];
                return (
                    <Animated.View
                        key={dotName}
                        style={[
                            dynamicStyles.dot,
                            dynamicStyles[dotName],
                            {
                                transform: [
                                    { translateX },
                                    { translateY },
                                    { scale },
                                    { translateX: Animated.multiply(translateX, -1) },
                                    { translateY: Animated.multiply(translateY, -1) },
                                ],
                            },
                        ]}
                    />
                );
            })}
            <Animated.View
                style={[
                    dynamicStyles.center,
                    {
                        width: iconSize,
                        height: iconSize,
                        transform: [{ translateX: -halfIconSize }, { translateY: -halfIconSize }, { scale: hearScaleValue }],
                    },
                ]}
            >
                <LikeIcon width={iconSize} height={iconSize} />
            </Animated.View>
        </>
    );
};

export default HeartAnimation;
