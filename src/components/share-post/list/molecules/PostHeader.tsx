import { ISharePostsData } from '<SharePostAPI>';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Profile from '../atoms/Profile';
import Follow from '../atoms/Follow';
import PostKebabMenu from '../atoms/PostKebabMenu';

type PostHeaderProps = Pick<ISharePostsData, 'name' | 'profile' | 'isFollow' | 'userId'>;

const PostHeader = ({ name, profile, isFollow, userId }: PostHeaderProps) => {
    return (
        <View style={styles.container}>
            <Profile userId={userId} name={name} profile={profile} />
            <View style={styles.rightContent}>
                <Follow isFollow={isFollow} />
                <PostKebabMenu />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default PostHeader;
