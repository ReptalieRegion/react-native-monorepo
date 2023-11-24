import { useNavigation } from '@react-navigation/native';
import { Typo, color } from '@reptile-region/design-system';
import type { ReactNode } from 'react';
import React from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import type { IconFunction } from '<Icon>';
import { BackButton, CancelButton, Logo } from '@/assets/icons';
import MainStatusBar from '@/components/@common/atoms/StatusBar';

type LeftIconType = 'cancel' | 'back' | 'logo';

type LeftIconMapType = {
    [key in LeftIconType]: IconFunction;
};

export type HeaderProps = {
    leftIconClick?: () => void;
    leftIcon?: LeftIconType;
    containerStyle?: ViewStyle;
    titleStyle?: TextStyle;
    title?: string;
    right?: string | ReactNode;
};

const LEFT_ICON: LeftIconMapType = {
    cancel: CancelButton,
    back: BackButton,
    logo: Logo,
};

export default function BaseHeader({
    leftIconClick,
    leftIcon = 'logo',
    titleStyle,
    containerStyle,
    title,
    right,
}: HeaderProps) {
    const navigation = useNavigation();
    const customStyles = StyleSheet.create({
        container: containerStyle ?? {
            borderBottomWidth: 0.5,
            borderBottomColor: color.Gray[250].toString(),
        },
        title: titleStyle ?? {},
    });
    const Icon = LEFT_ICON[leftIcon];

    const handleBackButtonClick = () => {
        if (leftIconClick) {
            leftIconClick();
            return;
        }
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
                    <Typo variant="title3" textAlign="center">
                        {title}
                    </Typo>
                </View>
                <View style={[styles.right]}>{typeof right === 'string' ? <Typo>{right}</Typo> : right}</View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.White.toString(),
    },
    left: {
        position: 'absolute',
        left: 10,
        zIndex: 1,
    },
    center: {
        flex: 1,
    },
    right: {
        position: 'absolute',
        right: 10,
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
