import React from 'react';
import { View } from 'react-native';
import SharePostWriteTitle from '../atoms/SharePostWriteTitle';
import WritingComponent from '../atoms/Writing';

const PostContentWrite = () => {
    return (
        <View>
            <SharePostWriteTitle title="내용 작성" />
            <WritingComponent />
        </View>
    );
};

export default PostContentWrite;
