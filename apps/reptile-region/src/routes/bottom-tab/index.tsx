import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import HomeRoutes from './HomeRoutes';
import InfoRoutes from './InfoRoutes';
import MyRoutes from './MyRoutes';
import SharePostRoutes from './SharePostRoutes';
import ShopRoutes from './ShopRoutes';

import type { BottomTabNativeStackParamList, BottomTabParamList } from '<routes/bottom-tab>';
import type { RootRoutesParamList } from '<routes/root>';
import { MainBottomBar } from '@/components/@common/molecules';
import type { MainBottomBarActions } from '@/components/@common/molecules/BottomTabBarMenu/MainBottomBar';
import { useAuth } from '@/components/auth/organisms/Auth/hooks/useAuth';

type BottomTabScreenProps = CompositeScreenProps<
    NativeStackScreenProps<BottomTabNativeStackParamList, 'tab'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabRoutes({ navigation }: BottomTabScreenProps) {
    const { isSignIn } = useAuth();

    const handleTabPressNavigate: MainBottomBarActions['onPressNavigate'] = ({ navigation: tabNavigation, routeName }) => {
        if (!isSignIn && routeName === 'my/routes') {
            navigation.navigate('sign-in');
        } else {
            tabNavigation.navigate(routeName);
        }
    };

    return (
        <BottomTab.Navigator
            initialRouteName="home/routes"
            screenOptions={{ headerShown: false }}
            tabBar={(props) => MainBottomBar({ ...props, onPressNavigate: handleTabPressNavigate })}
        >
            <BottomTab.Screen name="home/routes" component={HomeRoutes} />
            <BottomTab.Screen name="shop/routes" component={ShopRoutes} />
            <BottomTab.Screen name="share-post/routes" component={SharePostRoutes} />
            <BottomTab.Screen name="info/routes" component={InfoRoutes} />
            <BottomTab.Screen name="my/routes" component={MyRoutes} />
        </BottomTab.Navigator>
    );
}
