import { color } from 'design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import SharePostsDetailList from '../organisms/PostsDetailList';

const SharePostDetailProfile = () => {
    return (
        <View style={styles.container}>
            <SharePostsDetailList />
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
