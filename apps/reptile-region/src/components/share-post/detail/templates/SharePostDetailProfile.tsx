import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import SharePostsDetailList from '../organisms/PostsDetailList';
import UserDetailPanel from '../organisms/UserDetailPanel';

import type { BottomTabSharePostDetailRouteProp } from '<BottomTabSharePostRoutes>';
import { color } from '@/components/common/tokens/colors';

const SharePostDetailProfile = () => {
    const route = useRoute<BottomTabSharePostDetailRouteProp>();
    const userId = route.params.userId;

    return (
        <View style={styles.container}>
            <UserDetailPanel userId={userId} />
            <SharePostsDetailList userId={userId} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
});

export default SharePostDetailProfile;
