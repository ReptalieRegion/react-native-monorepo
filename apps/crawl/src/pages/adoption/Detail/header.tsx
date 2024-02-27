import { color } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackButton, KebabMenu } from '@/assets/icons';
import { HEADER_HEIGHT } from '@/constants/global';
import type { AdoptionDetailPageScreen } from '@/types/routes/props/adoption/list';

export function AdoptionDetailHeader({ navigation }: Pick<AdoptionDetailPageScreen, 'navigation'>) {
    const { top } = useSafeAreaInsets();
    const navigateBack = () => {
        navigation.goBack();
    };

    return (
        <View style={[styles.container, { paddingTop: top }]}>
            <TouchableOpacity onPress={navigateBack}>
                <BackButton fill={color.White.toString()} width={30} height={30} />
            </TouchableOpacity>
            <KebabMenu fill={color.White.toString()} width={30} height={30} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 20,
        height: HEADER_HEIGHT,
        justifyContent: 'space-between',
        zIndex: 20,
    },
});
