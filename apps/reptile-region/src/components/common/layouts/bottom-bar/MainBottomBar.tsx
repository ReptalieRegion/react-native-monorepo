import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import * as Haptic from 'react-native-haptic-feedback';

import MainBottomTabBarButton from './MainBottomTabBarButton';

import type { IconProps } from '<Icon>';
import { RootRoutesParamList } from '<RootRoutes>';
import {
    Cart as ShopIcon,
    Community as InfoIcon,
    Home as HomeIcon,
    My as MyIcon,
    Share as SharePostIcon,
} from '@/assets/icons';
import { color } from '@/components/common/tokens/colors';
import useKeyboard from '@/hooks/useKeyboard';

type MenusType = {
    [key in keyof RootRoutesParamList]: {
        Icon: (props: IconProps) => React.JSX.Element;
        name: string;
    };
};

const MENUS: Partial<MenusType> = {
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

const MainBottomBar = ({ state, navigation, insets }: BottomTabBarProps) => {
    const { isKeyboardShow } = useKeyboard();
    const dynamicStyle = StyleSheet.create({
        container: {
            paddingBottom: insets.bottom,
            display: isKeyboardShow.value && Platform.OS === 'android' ? 'none' : 'flex',
        },
    });

    return (
        <View style={styles.bgWhite}>
            <View style={[styles.container, dynamicStyle.container]}>
                {state.routes.map((route, index) => {
                    const routeName = route.name as keyof RootRoutesParamList;
                    const item = MENUS[routeName];

                    if (item === undefined) {
                        return null;
                    }

                    const { Icon, name } = item;
                    const isFocused = state.index === index;
                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            Haptic.trigger('impactLight');
                            navigation.navigate(route.name);
                        }
                    };

                    return (
                        <MainBottomTabBarButton
                            key={route.name}
                            isFocused={isFocused}
                            onPress={onPress}
                            Icon={Icon}
                            name={name}
                        />
                    );
                })}
            </View>
        </View>
    );
};

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

export default (props: BottomTabBarProps) => <MainBottomBar {...props} />;
