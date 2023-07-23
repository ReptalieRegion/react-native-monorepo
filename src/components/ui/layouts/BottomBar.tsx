import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Cart from '@/assets/icons/Cart';
import Community from '@/assets/icons/Community';
import Home from '@/assets/icons/Home';
import My from '@/assets/icons/My';
import Share from '@/assets/icons/Share';
import { INextJSNavigation } from '@reptalieregion/webview-bridge';

interface IAnimateScale {
    scaleX: Animated.Value;
    scaleY: Animated.Value;
}

const menus = [
    { pageURL: '/home', Icon: Home, name: '홈' },
    { pageURL: '/home/cart', Icon: Cart, name: '쇼핑' },
    { pageURL: '/home/share/list', Icon: Share, name: '일상공유' },
    { pageURL: '/home/community', Icon: Community, name: '정보공유' },
    { pageURL: '/home/my', Icon: My, name: '내 정보' },
];

export const HomeBottomBar = ({ nextJSNavigation }: { nextJSNavigation: INextJSNavigation }) => {
    const { bottom } = useSafeAreaInsets();
    const [currentPath, setCurrentPath] = useState('/home');

    const scaleValues = useRef<IAnimateScale[]>(
        menus.map(() => ({
            scaleX: new Animated.Value(1),
            scaleY: new Animated.Value(1),
        })),
    ).current;

    const handleClickIcon = (pageURL: string) => {
        setCurrentPath(pageURL);
        nextJSNavigation.push({ href: pageURL });
    };

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

    return (
        <View style={[styles.container, { paddingBottom: bottom }]}>
            {menus.map(({ Icon, name, pageURL }, index) => {
                return (
                    <TouchableOpacity
                        key={name}
                        activeOpacity={1}
                        style={[styles.iconContainer]}
                        onPress={() => handleClickIcon(pageURL)}
                        onPressIn={() => handlePressInIcon(index)}
                        onPressOut={() => handlePressOutIcon(index)}
                    >
                        <View style={styles.icon}>
                            <Animated.View
                                style={{
                                    transform: [{ scaleX: scaleValues[index].scaleX }, { scaleY: scaleValues[index].scaleY }],
                                }}
                            >
                                <Icon fill={currentPath === pageURL ? '#5DC19BFF' : undefined} />
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
