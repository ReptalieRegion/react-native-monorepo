import BackButton from '@/assets/icons/BackButton';
import CancelButton from '@/assets/icons/CancelButton';
import Logo from '@/assets/icons/Logo';
import { useNavigation } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IHeaderProps {
    leftIconClick?: () => void;
    leftIcon?: 'cancel' | 'back' | 'logo';
    containerStyle?: ViewStyle;
    titleStyle?: TextStyle;
    title?: string;
    right?: string | ReactNode;
}

const MainHeader = ({ leftIconClick, leftIcon = 'back', titleStyle, containerStyle, title, right }: IHeaderProps) => {
    const { top } = useSafeAreaInsets();
    const navigation = useNavigation();
    const customStyles = StyleSheet.create({
        container: containerStyle ?? {},
        title: titleStyle ?? {},
    });

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
                {leftIcon === 'back' ? (
                    <BackButton width={30} height={30} />
                ) : leftIcon === 'cancel' ? (
                    <CancelButton width={30} height={30} />
                ) : (
                    <Logo width={30} height={30} />
                )}
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

export default MainHeader;
