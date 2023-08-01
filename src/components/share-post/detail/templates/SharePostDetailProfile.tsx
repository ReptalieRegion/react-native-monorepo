import React from 'react';
import { StyleSheet, View } from 'react-native';
import UserDetailPanel from '../organisms/UserDetailPanel';
import SharePostsDetailList from '../molecules/PostsDetailList';
import { useFetchDetailPosts } from '@/apis/share-post';
import { useRoute } from '@react-navigation/native';
import { SharePostDetailPageRouteProp } from '<Routes>';
import { color } from '@/components/common/tokens/colors';

const SharePostDetailProfile = () => {
    const route = useRoute<SharePostDetailPageRouteProp>();
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
