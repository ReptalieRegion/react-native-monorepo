import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { color } from '@reptile-region/design-system';
import React, { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';

import FollowerPage from '@/pages/share-post/UserProfileList/FollowList/FollowerPage';
import FollowingPage from '@/pages/share-post/UserProfileList/FollowList/FollowingPage';
import type {
    FollowParamList,
    SharePostBottomTabParamList,
    SharePostModalParamList,
} from '@/types/routes/param-list/sharePost';

type FollowRoutesScreenProps =
    | NativeStackScreenProps<SharePostModalParamList, 'modal/follow/list'>
    | NativeStackScreenProps<SharePostBottomTabParamList, 'bottom-tab/follow/list'>;

const TopTab = createMaterialTopTabNavigator<FollowParamList>();

export default function FollowRoutes({
    navigation,
    route: {
        params: {
            initialRouteName,
            user: { id: userId, followerCount, followingCount, nickname },
            pageState,
        },
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
                tabBarActiveTintColor: color.DarkGray[500].toString(),
                tabBarLabelStyle: { fontSize: 14 },
                tabBarStyle: { height: 40, marginTop: 0, paddingTop: 0 },
                tabBarItemStyle: { marginTop: 0, paddingTop: 0 },
                tabBarIndicatorStyle: { height: 1, backgroundColor: color.DarkGray[500].toString() },
            }}
        >
            <TopTab.Screen
                name="follower"
                component={FollowerPage}
                options={{ tabBarLabel: `${followerCount} 팔로워` }}
                initialParams={{
                    user: { followerCount, id: userId },
                    pageState,
                }}
            />
            <TopTab.Screen
                name="following"
                component={FollowingPage}
                options={{ tabBarLabel: `${followingCount} 팔로잉` }}
                initialParams={{
                    user: {
                        id: userId,
                        followingCount,
                    },
                    pageState,
                }}
            />
        </TopTab.Navigator>
    );
}
