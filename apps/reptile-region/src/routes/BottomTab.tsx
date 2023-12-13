import { color } from '@crawl/design-system';
import { createBottomTabNavigator, type BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';

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

    const tabBar = useCallback(
        (props: BottomTabBarProps) => {
            const handleTabPressNavigate: MainBottomBarActions['onPressNavigate'] = ({
                navigation: tabNavigation,
                routeName,
            }) => {
                const requireAuthRouteList: (keyof BottomTabParamList)[] = ['me/routes', 'diary/routes'];
                const isNavigateSignPage = !isSignIn && requireAuthRouteList.includes(routeName);

                isNavigateSignPage
                    ? navigation.navigate('sign-in', { successNavigate: 'ME' })
                    : tabNavigation.navigate(routeName);
            };

            return <MainBottomBar {...props} onPressNavigate={handleTabPressNavigate} />;
        },
        [isSignIn, navigation],
    );

    return (
        <BottomTab.Navigator
            initialRouteName="home/routes"
            screenOptions={{ headerShown: false }}
            tabBar={tabBar}
            sceneContainerStyle={{
                backgroundColor: color.White.toString(),
            }}
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
