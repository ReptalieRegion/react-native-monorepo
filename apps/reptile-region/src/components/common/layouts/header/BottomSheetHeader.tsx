import { getHeaderTitle } from '@react-navigation/elements';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { BottomSheetAnimatedGesture } from 'bottom-sheet';
import { color } from 'design-system';
import { useCallback } from 'react';
import React, { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { BackButton } from '@/assets/icons';

type LeftIcon = 'none' | 'back';

export type BottomSheetHeaderProps = {
    leftIconPress?: () => void;
    leftIcon?: LeftIcon;
};

const Icon = ({ showBackButton }: { showBackButton: boolean | undefined }) => {
    if (showBackButton) {
        return <BackButton width={30} height={30} />;
    }

    return <View style={styles.baseWidth} />;
};

const BottomSheetHeader = ({ navigation, route, options }: NativeStackHeaderProps) => {
    const title = getHeaderTitle(options, route.name);
    const handleLeftPress = useCallback(() => {
        if (options.headerBackVisible && navigation.canGoBack()) {
            navigation.goBack();
        }
    }, [navigation, options.headerBackVisible]);

    return (
        <BottomSheetAnimatedGesture>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleLeftPress}>
                    <Icon showBackButton={options.headerBackVisible} />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.baseWidth} />
            </View>
        </BottomSheetAnimatedGesture>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.White.toString(),
        borderBottomWidth: 0.5,
        borderBottomColor: color.Gray[250].toString(),
    },
    title: {
        flex: 1,
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '600',
    },
    baseWidth: {
        width: 30,
    },
});

export default BottomSheetHeader;
