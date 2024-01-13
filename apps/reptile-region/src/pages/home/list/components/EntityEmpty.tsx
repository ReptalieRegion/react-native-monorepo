import { Typo, color } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useHomeListNavigation from '../hooks/useHomeListNavigation';

import { Plus } from '@/assets/icons';

type EntityEmptyItemProps = {
    containerStyle?: StyleProp<ViewStyle>;
};

export default function EntityEmpty({ containerStyle }: EntityEmptyItemProps) {
    const { navigationEntityCreate } = useHomeListNavigation();

    return (
        <TouchableOpacity style={containerStyle} containerStyle={styles.container} onPress={navigationEntityCreate}>
            <View style={styles.wrapper}>
                <Plus fill={color.Green[750].toString()} />
                <Typo textAlign="center" color="primary">
                    {'내 개체를\n추가하고 관리해봐요'}
                </Typo>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    container: {
        flex: 1,
    },
});
