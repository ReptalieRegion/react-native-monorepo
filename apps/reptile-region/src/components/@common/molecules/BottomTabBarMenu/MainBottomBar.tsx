import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { color } from 'design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Haptic from 'react-native-haptic-feedback';

import { BottomTabBarButton } from '../../atoms';

import type { IconProps } from '<Icon>';
import { BottomTabParamList } from '<routes/bottom-tab>';
import {
    Cart as ShopIcon,
    Community as InfoIcon,
    Home as HomeIcon,
    My as MyIcon,
    Share as SharePostIcon,
} from '@/assets/icons';

type MenusType = {
    [key in keyof BottomTabParamList]?: {
        Icon: (props: IconProps) => React.JSX.Element;
        name: string;
    };
};

const MENUS: MenusType = {
    'home/routes': {
        Icon: HomeIcon,
        name: '홈',
    },
    'shop/routes': {
        Icon: ShopIcon,
        name: '쇼핑',
    },
    'share-post/routes': {
        Icon: SharePostIcon,
        name: '일상공유',
    },
    'info/routes': {
        Icon: InfoIcon,
        name: '정보공유',
    },
    'my/routes': {
        Icon: MyIcon,
        name: '내 정보',
    },
};

export default function MainBottomBar({ state, navigation, insets }: BottomTabBarProps) {
    return (
        <View style={styles.bgWhite}>
            <View style={[styles.container, { paddingBottom: insets.bottom }]}>
                {state.routes.map((route, index) => {
                    const routeName = route.name as keyof BottomTabParamList;
                    const item = MENUS[routeName];

                    if (item === undefined) {
                        return null;
                    }

                    const { Icon, name } = item;
                    const isFocused = state.index === index;
                    const onPress = () => {
                        Haptic.trigger('impactLight');
                        if (!isFocused) {
                            navigation.navigate(route.name);
                        }
                    };

                    return (
                        <BottomTabBarButton key={route.name} isFocused={isFocused} onPress={onPress} Icon={Icon} name={name} />
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bgWhite: {
        backgroundColor: color.White.toString(),
    },
    container: {
        shadowColor: color.Black.toString(),
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        elevation: 24,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderTopLeftRadius: 19,
        borderTopRightRadius: 19,
        backgroundColor: color.White.toString(),
    },
});
