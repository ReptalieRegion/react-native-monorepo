import { Typo, color } from '@crawl/design-system';
import type { StackHeaderProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import { Keyboard, StyleSheet, View, useWindowDimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';

import { ConditionalRenderer } from '../../atoms';

import { BackButton, CancelButton } from '@/assets/icons';
import MainStatusBar from '@/components/@common/atoms/StatusBar';
import { HEADER_HEIGHT } from '@/constants/global';
import type { IconFunction } from '@/types/global/icons';

type LeftIconType = 'cancel' | 'back';

type LeftIconMapType = {
    [key in LeftIconType]: IconFunction;
};

export type HeaderProps = {
    steps: {
        name: string;
        leftIcon: LeftIconType;
    }[];
    rightTitle?: string;
    leftIconClick?: () => void;
    containerStyle?: ViewStyle;
    titleStyle?: TextStyle;
    titleShown?: boolean;
    progressbar?: {
        color: string;
        height: number;
    };
} & StackHeaderProps;

const LEFT_ICON: LeftIconMapType = {
    cancel: CancelButton,
    back: BackButton,
};

export default function ProgressHeader({
    steps,
    rightTitle,
    leftIconClick,
    titleStyle,
    containerStyle,
    navigation,
    options,
    titleShown = true,
    progressbar = {
        color: color.Teal[150].toString(),
        height: 2,
    },
}: HeaderProps) {
    const { width } = useWindowDimensions();
    const title = options.title;
    const right = options.headerRight?.({ canGoBack: navigation.canGoBack() }) ?? rightTitle;
    const stepSize = steps.length;
    const currentIndex = steps.findIndex((value) => value.name === title) ?? 0;
    const [percent, setPercent] = useState(currentIndex / stepSize);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPercent((currentIndex + 1) / stepSize);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [currentIndex, stepSize, steps, title]);

    const customStyles = StyleSheet.create({
        container: containerStyle ?? {},
        title: titleStyle ?? {},
    });

    const Icon = LEFT_ICON[steps[currentIndex].leftIcon];

    const handleBackButtonClick = () => {
        if (leftIconClick) {
            leftIconClick();
            return;
        }
        Keyboard.dismiss();
        navigation.goBack();
    };

    return (
        <>
            <MainStatusBar />
            <View style={[styles.container, customStyles.container]}>
                <TouchableOpacity onPress={handleBackButtonClick} containerStyle={styles.left}>
                    <Icon width={30} height={30} />
                </TouchableOpacity>
                <View style={styles.center}>
                    <ConditionalRenderer
                        condition={!!titleShown}
                        trueContent={
                            <Typo variant="title3" textAlign="center">
                                {typeof title === 'string' ? title : <title />}
                            </Typo>
                        }
                    />
                </View>
                <View style={styles.right}>{typeof right === 'string' ? <Typo>{right}</Typo> : right}</View>
            </View>
            <Progress.Bar
                width={width}
                height={progressbar.height}
                color={progressbar.color}
                progress={percent}
                borderWidth={0}
                unfilledColor="white"
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        height: HEADER_HEIGHT,
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.White.toString(),
    },
    left: {
        position: 'absolute',
        left: 20,
        zIndex: 1,
    },
    center: {
        flex: 1,
    },
    right: {
        position: 'absolute',
        right: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
