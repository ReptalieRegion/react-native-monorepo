import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { color } from '@reptile-region/design-system';
import React, { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';

import type { SharePostTabParamList } from '<routes/bottom-tab>';
import type { SharePostTopTabParamList } from '<routes/top-tab>';
import FollowerPage from '@/pages/share-post/UserProfileList/FollowList/FollowerPage';
import FollowingPage from '@/pages/share-post/UserProfileList/FollowList/FollowingPage';

type FollowRoutesScreenProps = NativeStackScreenProps<SharePostTabParamList, 'share-post/list/follow'>;

const TopTab = createMaterialTopTabNavigator<SharePostTopTabParamList>();

export default function FollowRoutes({
    navigation,
    route: {
        params: { initialRouteName, followerCount, followingCount, nickname, userId },
    },
}: FollowRoutesScreenProps) {
    const { width } = useWindowDimensions();

    useEffect(() => {
        navigation.setOptions({ headerTitle: nickname });
    }, [navigation, nickname]);

    return (
        <TopTab.Navigator
            initialRouteName={initialRouteName}
            initialLayout={{ width }}
            screenOptions={{
                tabBarActiveTintColor: color.Black.toString(),
                tabBarLabelStyle: { fontSize: 14 },
                tabBarStyle: { height: 40, marginTop: 0, paddingTop: 0 },
                tabBarItemStyle: { marginTop: 0, paddingTop: 0 },
                tabBarIndicatorStyle: { height: 1, backgroundColor: color.Black.toString() },
            }}
        >
            <TopTab.Screen
                name="share-post/follower/list"
                component={FollowerPage}
                options={{ tabBarLabel: `${followerCount} 팔로워` }}
                initialParams={{ followerCount, userId }}
            />
            <TopTab.Screen
                name="share-post/following/list"
                component={FollowingPage}
                options={{ tabBarLabel: `${followingCount} 팔로잉` }}
                initialParams={{ followingCount, userId }}
            />
        </TopTab.Navigator>
    );
}
