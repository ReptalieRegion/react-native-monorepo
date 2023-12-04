import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import DiaryRoutes from './Diary/TopTabRoutes';
import HomeRoutes from './Home';
import MeRoutes from './Me';
import SharePostRoutes from './SharePost/BottomTabRoutes';

import { MainBottomBar } from '@/components/@common/molecules';
import type { MainBottomBarActions } from '@/components/@common/molecules/BottomTabBarMenu/MainBottomBar';
import { useAuth } from '@/components/auth/organisms/Auth/hooks/useAuth';
import type { RootRoutesParamList } from '@/types/routes/param-list';
import type { BottomTabNativeStackParamList, BottomTabParamList } from '@/types/routes/param-list/bottom-tab';

type BottomTabScreenProps = CompositeScreenProps<
    NativeStackScreenProps<BottomTabNativeStackParamList, 'tab'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabRoutes({ navigation }: BottomTabScreenProps) {
    const { isSignIn } = useAuth();

    const handleTabPressNavigate: MainBottomBarActions['onPressNavigate'] = ({ navigation: tabNavigation, routeName }) => {
        // if (!isSignIn && (routeName === 'me/routes' || routeName === 'diary/routes')) {
        if (!isSignIn && routeName === 'me/routes') {
            navigation.navigate('sign-in', { successNavigate: 'ME' });
        } else {
            tabNavigation.navigate(routeName);
        }
    };

    return (
        <BottomTab.Navigator
            // initialRouteName="home/routes"
            initialRouteName="home/routes"
            screenOptions={{ headerShown: false }}
            tabBar={(props) => MainBottomBar({ ...props, onPressNavigate: handleTabPressNavigate })}
        >
            <BottomTab.Screen name="home/routes" component={HomeRoutes} />
            <BottomTab.Screen name="share-post/routes" component={SharePostRoutes} />
            <BottomTab.Screen name="diary/routes" component={DiaryRoutes} />
            <BottomTab.Screen name="me/routes" component={MeRoutes} />
            {/* TODO 추후 쇼핑 기능 추가할 때 사용 */}
            {/* <BottomTab.Screen name="info/routes" component={InfoRoutes} /> */}
            {/* <BottomTab.Screen name="shop/routes" component={ShopRoutes} /> */}
        </BottomTab.Navigator>
    );
}
