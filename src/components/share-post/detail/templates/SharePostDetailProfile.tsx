import React from 'react';
import { StyleSheet, View } from 'react-native';
import UserDetailPanel from '../organisms/UserDetailPanel';
import SharePostsDetailList from '../molecules/PostsDetailList';
import { useFetchDetailPosts } from '@/apis/share-post';
import { useRoute } from '@react-navigation/native';
import detail from '@/mocks/data/share-post/detail.json';
import { SharePostDetailPageRouteProp } from '<Routes>';
import { color } from '@/components/common/tokens/colors';

const SharePostDetailProfile = () => {
    const route = useRoute<SharePostDetailPageRouteProp>();
    const { data, isLoading } = useFetchDetailPosts(route.params.userId);
    const temp = data ? data : detail[route.params.userId as '1' | '2' | '3' | '4' | '5'];

    if (isLoading || !temp) {
        return null;
    }

    return (
        <View style={styles.container}>
            <UserDetailPanel {...temp} />
            <SharePostsDetailList {...temp} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.White[50].toString(),
    },
});

export default SharePostDetailProfile;
