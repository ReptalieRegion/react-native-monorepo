import React, { ReactNode } from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BackButton from '@/assets/icons/BackButton';
import CancelButton from '@/assets/icons/CancelButton';
import Logo from '@/assets/icons/Logo';
import { useNavigation } from '@react-navigation/native';
import { IIcon } from '<Icon>';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';

type TLeftIcon = 'cancel' | 'back' | 'logo';

interface IHeaderProps {
    leftIconClick?: () => void;
    leftIcon?: TLeftIcon;
    containerStyle?: ViewStyle;
    titleStyle?: TextStyle;
    title?: string;
    right?: string | ReactNode;
}

type TLeftIconMap = {
    [key in TLeftIcon]: IIcon;
};

const LEFT_ICON: TLeftIconMap = {
    cancel: CancelButton,
    back: BackButton,
    logo: Logo,
};

const BaseHeader = ({ leftIconClick, leftIcon = 'logo', titleStyle, containerStyle, title, right }: IHeaderProps) => {
    const { top } = useSafeAreaInsets();
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
        <View style={[styles.container, customStyles.container, { paddingTop: top }]}>
            <TouchableOpacity onPress={handleBackButtonClick}>
                <Icon width={30} height={30} />
            </TouchableOpacity>
            <Text style={[styles.title, customStyles.title]}>{title}</Text>
            <View style={[styles.right]}>{typeof right === 'string' ? <Text>{right}</Text> : right}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgray',
    },
    right: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 30,
        minHeight: 30,
    },
    title: {
        fontSize: 17,
        fontWeight: '600',
    },
});

export default (headerProps?: IHeaderProps) => {
    return (_: BottomTabHeaderProps) => <BaseHeader {...headerProps} />;
};
