import React from 'react';
import { View } from 'react-native';
import UserDetailPanel from '../organisms/UserDetailPanel';
import SharePostsDetailList from '../molecules/PostsDetailList';
import { useFetchDetailPosts } from '@/apis/share-post';
import { useRoute } from '@react-navigation/native';
import { SharePostDetailPageRouteProp } from '<Routes>';

const SharePostDetailProfile = () => {
    const route = useRoute<SharePostDetailPageRouteProp>();
    const { data, isLoading } = useFetchDetailPosts(route.params.userId);

    if (isLoading || !data) {
        return null;
    }

    return (
        <View>
            <UserDetailPanel {...data} />
            <SharePostsDetailList {...data} />
        </View>
    );
};

export default SharePostDetailProfile;
