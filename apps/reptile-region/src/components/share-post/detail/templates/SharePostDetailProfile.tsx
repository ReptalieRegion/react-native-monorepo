import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import SharePostsDetailList from '../molecules/PostsDetailList';
import UserDetailPanel from '../organisms/UserDetailPanel';

import { BottomTabSharePostDetailRouteProp } from '<BottomTabSharePostRoutes>';
import { useFetchDetailPosts } from '../../../../apis/share-post';
import { color } from '../../../common/tokens/colors';

const SharePostDetailProfile = () => {
    const route = useRoute<BottomTabSharePostDetailRouteProp>();
    const { data, isLoading } = useFetchDetailPosts(route.params.userId);

    if (isLoading || !data) {
        return null;
    }

    return (
        <View style={styles.container}>
            <UserDetailPanel {...data} />
            <SharePostsDetailList {...data} />
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
