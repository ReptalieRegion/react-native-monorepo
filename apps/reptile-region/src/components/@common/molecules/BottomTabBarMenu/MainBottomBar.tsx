import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { color } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Haptic from 'react-native-haptic-feedback';

import { BottomTabBarButton } from '../../atoms';

import { Home as HomeIcon, Community as InfoIcon, My as MyIcon, Share as SharePostIcon } from '@/assets/icons';
import type { IconProps } from '@/types/global/icons';
import type { BottomTabParamList } from '@/types/routes/param-list/bottom-tab';

export interface MainBottomBarActions {
    onPressNavigate({
        routeName,
        navigation,
    }: Pick<BottomTabBarProps, 'navigation'> & { routeName: keyof BottomTabParamList }): void;
}

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
    'share-post/routes': {
        Icon: SharePostIcon,
        name: '일상공유',
    },
    'diary/routes': {
        Icon: InfoIcon,
        name: '다이어리',
    },
    'me/routes': {
        Icon: MyIcon,
        name: '내 정보',
    },
    // 'info/routes': {
    //     Icon: InfoIcon,
    //     name: '정보공유',
    // },
    // TODO 추후 쇼핑 기능 추가할 때 사용
    // 'shop/routes': {
    //     Icon: ShopIcon,
    //     name: '쇼핑',
    // },
};

export default function MainBottomBar({
    state,
    navigation,
    insets,
    onPressNavigate,
}: BottomTabBarProps & MainBottomBarActions) {
    const paddingBottom = insets.bottom === 0 ? 10 : insets.bottom;

    return (
        <View style={styles.bgWhite}>
            <View style={[styles.container, { paddingBottom }]}>
                {state.routes.map((route, index) => {
                    const routeName = route.name as keyof BottomTabParamList;
                    const item = MENUS[routeName];

                    if (item === undefined) {
                        return null;
                    }

                    const { Icon, name } = item;
                    const isFocused = state.index === index;

                    const handlePress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            Haptic.trigger('impactLight');
                            onPressNavigate({ routeName, navigation });
                        }
                    };

                    const handleLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <BottomTabBarButton
                            key={route.name}
                            isFocused={isFocused}
                            name={name}
                            onPress={handlePress}
                            onLongPress={handleLongPress}
                            Icon={Icon}
                        />
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
