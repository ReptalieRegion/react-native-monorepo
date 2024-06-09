import React, { type JSXElementConstructor, type ReactElement } from 'react';
import { Animated, StyleSheet } from 'react-native';

export default function FastListSectionRenderer({
    layoutY,
    layoutHeight,
    nextSectionLayoutY,
    scrollTopValue,
    children,
}: {
    layoutY: number;
    layoutHeight: number;
    nextSectionLayoutY?: number;
    scrollTopValue: Animated.Value;
    children: ReactElement<any, string | JSXElementConstructor<any>>;
}): React.ReactNode {
    const inputRange: number[] = [-1, 0];
    const outputRange: number[] = [0, 0];

    inputRange.push(layoutY);
    outputRange.push(0);
    const collisionPoint = (nextSectionLayoutY || 0) - layoutHeight;
    if (collisionPoint >= layoutY) {
        inputRange.push(collisionPoint, collisionPoint + 1);
        outputRange.push(collisionPoint - layoutY, collisionPoint - layoutY);
    } else {
        inputRange.push(layoutY + 1);
        outputRange.push(1);
    }

    const translateY = scrollTopValue.interpolate({ inputRange, outputRange });

    const child = React.Children.only(children);
    const style = [child.props.style, styles.wrapper, { height: layoutHeight, transform: [{ translateY }] }];

    return <Animated.View style={style}>{React.cloneElement(child, cloneProps)}</Animated.View>;
}

const styles = StyleSheet.create({
    wrapper: {
        zIndex: 10,
    },
});

const cloneProps = {
    style: {
        flex: 1,
    },
};
