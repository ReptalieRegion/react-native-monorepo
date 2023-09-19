import { useNavigation } from '@react-navigation/native';
import { Typo, color } from 'design-system';
import React, { ReactNode } from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import type { IconFunction } from '<Icon>';
import { BackButton, CancelButton, Logo } from '@/assets/icons';
import MainStatusBar from '@/components/common/layouts/status-bar/MainStatusBar';

type LeftIconType = 'cancel' | 'back' | 'logo';

type LeftIconMapType = {
    [key in LeftIconType]: IconFunction;
};

export type IHeaderProps = {
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

const BaseHeader = ({ leftIconClick, leftIcon = 'logo', titleStyle, containerStyle, title, right }: IHeaderProps) => {
    const navigation = useNavigation();
    const customStyles = StyleSheet.create({
        container: containerStyle ?? {},
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
            <View style={[styles.bgWhite, styles.container, customStyles.container]}>
                <TouchableOpacity onPress={handleBackButtonClick}>
                    <Icon width={30} height={30} />
                </TouchableOpacity>
                <Typo variant="title3">{title}</Typo>
                <View style={[styles.right]}>{typeof right === 'string' ? <Typo>{right}</Typo> : right}</View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    bgWhite: {
        backgroundColor: color.White.toString(),
    },
    container: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: color.Gray[250].toString(),
    },
    right: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 30,
    },
});

export default BaseHeader;
