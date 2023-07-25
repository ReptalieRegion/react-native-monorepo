import React, { useRef } from 'react';
import { Animated, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ShopIcon from '@/assets/icons/Cart';
import InfoIcon from '@/assets/icons/Community';
import HomeIcon from '@/assets/icons/Home';
import MyIcon from '@/assets/icons/My';
import SharePostIcon from '@/assets/icons/Share';
import { TabStackParamList } from '<Routes>';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { IIconProps } from '<Icon>';
import useKeyboard from '@/hooks/useKeyboard';

interface IAnimateScale {
    scaleX: Animated.Value;
    scaleY: Animated.Value;
}

type TMenus = {
    [key in keyof TabStackParamList]: {
        Icon: (props: IIconProps) => React.JSX.Element;
        name: string;
    };
};

const MENUS: TMenus = {
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
    const scaleValues = useRef<IAnimateScale[]>(
        Object.entries(MENUS).map(() => ({
            scaleX: new Animated.Value(1),
            scaleY: new Animated.Value(1),
        })),
    ).current;

    const handlePressInIcon = (index: number) => {
        Animated.timing(scaleValues[index].scaleX, {
            toValue: 0.9,
            duration: 200,
            useNativeDriver: true,
        }).start();

        Animated.timing(scaleValues[index].scaleY, {
            toValue: 0.9,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOutIcon = (index: number) => {
        Animated.sequence([
            Animated.timing(scaleValues[index].scaleX, {
                toValue: 1.25,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(scaleValues[index].scaleX, {
                toValue: 1.0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
        Animated.sequence([
            Animated.timing(scaleValues[index].scaleY, {
                toValue: 1.15,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(scaleValues[index].scaleY, {
                toValue: 1.0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const { isKeyboardShow } = useKeyboard();
    const dynamicStyle = StyleSheet.create({
        container: {
            paddingBottom: insets.bottom,
            display: isKeyboardShow && Platform.OS === 'android' ? 'none' : 'flex',
        },
    });

    return (
        <View style={[styles.container, dynamicStyle.container]}>
            {state.routes.map((route, index) => {
                const { Icon, name } = MENUS[route.name as keyof TabStackParamList];
                const isFocused = state.index === index;
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, { merge: true });
                    }
                };

                return (
                    <TouchableOpacity
                        key={route.name}
                        activeOpacity={1}
                        style={[styles.iconContainer]}
                        onPress={onPress}
                        onPressIn={() => handlePressInIcon(index)}
                        onPressOut={() => handlePressOutIcon(index)}
                    >
                        <View style={styles.icon}>
                            <Animated.View
                                style={{
                                    transform: [{ scaleX: scaleValues[index].scaleX }, { scaleY: scaleValues[index].scaleY }],
                                }}
                            >
                                <Icon fill={isFocused ? '#5DC19BFF' : undefined} />
                            </Animated.View>
                            <Text style={styles.text}>{name}</Text>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
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
    iconContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '20%',
        paddingTop: 20,
        paddingBottom: 10,
    },
    icon: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 10,
        marginTop: 6,
    },
});

export default (props: BottomTabBarProps) => <MainBottomBar {...props} />;
