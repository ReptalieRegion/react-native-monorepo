import Follow from '@/components/share-post/list/atoms/Follow';
import React from 'react';
import { View } from 'react-native';

const SharePostListPage = () => {
    return (
        <View>
            <Follow isFollow={true} />
        </View>
    );
};

export default SharePostListPage;
