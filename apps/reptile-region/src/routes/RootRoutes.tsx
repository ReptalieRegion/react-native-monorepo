import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFlipper } from '@react-navigation/devtools';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { OverlayList } from 'overlay';
import { createOverlay } from 'overlay-manager';
import React, { useEffect } from 'react';

import HomeRoutes from './home';
import InfoRoutes from './info';
import MyRoutes from './my';
import SharePostRoutes from './share-post';
import ShopRoutes from './shop';

import { RootRoutesParamList } from '<RootRoutes>';
import { useSignIn } from '@/apis/auth';
import { MainBottomBar } from '@/components/@common/molecules';
import ToastContainer from '@/overlay/ToastContainer';

const BottomTab = createBottomTabNavigator<RootRoutesParamList>();
const Overlay = createOverlay<OverlayList>();

const RootRoutes = () => {
    const navigationRef = useNavigationContainerRef();
    useFlipper(navigationRef);

    const { mutate } = useSignIn();

    useEffect(() => {
        mutate({ userId: '3de3fm3cw3fl3i4.3d73ft3hk@gmail.com', password: '123123' });
    }, [mutate]);

    return (
        <Overlay.Container registerComponent={{ toast: ToastContainer }}>
            <NavigationContainer ref={navigationRef}>
                <BottomTab.Navigator
                    initialRouteName="home/routes"
                    screenOptions={{ headerShown: false }}
                    tabBar={MainBottomBar}
                    screenListeners={{ tabPress: (e) => e.preventDefault() }}
                >
                    <BottomTab.Screen name="home/routes" component={HomeRoutes} />
                    <BottomTab.Screen name="shop/routes" component={ShopRoutes} />
                    <BottomTab.Screen name="share-post/routes" component={SharePostRoutes} />
                    <BottomTab.Screen name="info/routes" component={InfoRoutes} />
                    <BottomTab.Screen name="my/routes" component={MyRoutes} />
                </BottomTab.Navigator>
            </NavigationContainer>
        </Overlay.Container>
    );
};

export default RootRoutes;
