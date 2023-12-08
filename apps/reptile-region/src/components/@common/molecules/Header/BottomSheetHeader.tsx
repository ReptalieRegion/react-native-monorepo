import { getHeaderTitle } from '@react-navigation/elements';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { BottomSheetAnimatedGesture } from '@reptile-region/bottom-sheet';
import { Typo, color } from '@reptile-region/design-system';
import React, { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { ConditionalRenderer } from '../../atoms';

import { BackButton } from '@/assets/icons';

type LeftIcon = 'none' | 'back';

export type BottomSheetHeaderProps = {
    leftIconPress?: () => void;
    leftIcon?: LeftIcon;
};

export default function BottomSheetHeader({ navigation, route, options }: NativeStackHeaderProps) {
    const title = getHeaderTitle(options, route.name);
    const handleLeftPress = () => {
        if (options.headerBackVisible && navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    return (
        <BottomSheetAnimatedGesture>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleLeftPress}>
                    <ConditionalRenderer
                        condition={options.headerBackVisible === undefined ? false : options.headerBackVisible}
                        trueContent={<BackButton width={30} height={30} />}
                        falseContent={<View style={styles.baseWidth} />}
                    />
                </TouchableOpacity>
                <View style={styles.flex}>
                    <Typo variant="title3" textAlign="center">
                        {title}
                    </Typo>
                </View>
                <View style={styles.baseWidth} />
            </View>
        </BottomSheetAnimatedGesture>
    );
}

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
    baseWidth: {
        width: 30,
    },
    flex: {
        flex: 1,
    },
});
