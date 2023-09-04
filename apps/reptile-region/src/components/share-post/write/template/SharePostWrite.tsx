import React from 'react';
import { StyleSheet, View } from 'react-native';

import FollowerUserList from '../atoms/FollowerUserList';
import PhotoRegister from '../molecules/PhotoRegister';
import PostContentWrite from '../molecules/PostContentWrite';

import { color } from '@/components/common/tokens/colors';

const SharePostWrite = () => {
    return (
        <View style={styles.container}>
            <PhotoRegister />
            <PostContentWrite />
            <FollowerUserList />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.White.toString(),
        flex: 1,
        padding: 20,
    },
});

export default SharePostWrite;
