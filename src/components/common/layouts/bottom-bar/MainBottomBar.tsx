import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import ShopIcon from '@/assets/icons/Cart';
import InfoIcon from '@/assets/icons/Community';
import HomeIcon from '@/assets/icons/Home';
import MyIcon from '@/assets/icons/My';
import SharePostIcon from '@/assets/icons/Share';
import { TabStackParamList } from '<Routes>';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { IconProps } from '<Icon>';
import useKeyboard from '@/hooks/useKeyboard';
import { color } from '../../tokens/colors';
import Haptic from '@/utils/webview-bridge/react-native/haptic/Haptic';
import MainBottomTabBarButton from './MainBottomTabBarButton';

type MenusType = {
    [key in keyof TabStackParamList]: {
        Icon: (props: IconProps) => React.JSX.Element;
        name: string;
    };
};

const MENUS: MenusType = {
    'home/list': {
        Icon: HomeIcon,
        name: '홈',
    },
    'shop/list': {
        Icon: ShopIcon,
        name: '쇼핑',
    },
    'share-post/list': {
        Icon: SharePostIcon,
        name: '일상공유',
    },
    'info/list': {
        Icon: InfoIcon,
        name: '정보공유',
    },
    'my/list': {
        Icon: MyIcon,
        name: '내 정보',
    },
};

const MainBottomBar = ({ state, navigation, insets }: BottomTabBarProps) => {
    const { isKeyboardShow } = useKeyboard();
    const dynamicStyle = StyleSheet.create({
        container: {
            paddingBottom: insets.bottom,
            display: isKeyboardShow && Platform.OS === 'android' ? 'none' : 'flex',
        },
    });

    return (
        <View style={styles.bgWhite}>
            <View style={[styles.container, dynamicStyle.container]}>
                {state.routes.map((route, index) => {
                    const routeName = route.name as keyof TabStackParamList;
                    const { Icon, name } = MENUS[routeName];
                    const isFocused = state.index === index;
                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            Haptic.trigger({ type: 'impactLight' });
                            navigation.navigate(route.name, { merge: true });
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
        shadowColor: '#000000',
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
        backgroundColor: 'white',
    },
});

export default (props: BottomTabBarProps) => <MainBottomBar {...props} />;
