import React from 'react';
import { View } from 'react-native';
import UserDetailPanel from '../organisms/UserDetailPanel';
import SharePostsDetailList from '../molecules/PostsDetailList';
import { useFetchDetailPosts } from '@/apis/share-post';
import { useRoute } from '@react-navigation/native';
import detail from '@/mocks/data/detail.json';
import { SharePostDetailPageRouteProp } from '<Routes>';

const SharePostDetailProfile = () => {
    const route = useRoute<SharePostDetailPageRouteProp>();
    const { data, isLoading } = useFetchDetailPosts(route.params.userId);
    const temp = data ? data : detail[route.params.userId as '1' | '2' | '3' | '4' | '5'];

    if (isLoading || !temp) {
        return null;
    }

    return (
        <View>
            <UserDetailPanel {...temp} />
            <SharePostsDetailList {...temp} />
        </View>
    );
};

export default SharePostDetailProfile;
