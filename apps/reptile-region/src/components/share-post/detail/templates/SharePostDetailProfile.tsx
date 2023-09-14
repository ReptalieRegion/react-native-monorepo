import { useRoute } from '@react-navigation/native';
import { color } from 'design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import SharePostsDetailList from '../organisms/PostsDetailList';
import UserDetailPanel from '../organisms/UserDetailPanel';

import { SharePostRouteProp } from '<SharePostRoutes>';

const SharePostDetailProfile = () => {
    const route = useRoute<SharePostRouteProp<'share-post/detail'>>();
    const userId = route.params.userId;
    const nickname = route.params.nickname;

    return (
        <View style={styles.container}>
            <UserDetailPanel userId={userId} nickname={nickname} />
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
