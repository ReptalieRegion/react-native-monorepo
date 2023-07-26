import React, { useState } from 'react';
import { ColorValue, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ISharePostsData } from '<SharePostAPI>';

type PostHeaderProps = Pick<ISharePostsData, 'isFollow'>;

interface FollowInfo {
    color: ColorValue;
    text: string;
}

const following: FollowInfo = { color: '#808080', text: '✓ 팔로잉' };
const follow: FollowInfo = { color: '#006600', text: '팔로우' };

const makeFollowInfo = (isFollow: boolean) => {
    return isFollow ? following : follow;
};

const Follow = ({ isFollow }: PostHeaderProps) => {
    const [isFollowing, setIsFollowing] = useState<boolean>(isFollow);
    const followInfo = makeFollowInfo(isFollowing);

    const handleClickFollow = () => {
        setIsFollowing((state) => !state);
    };

    return (
        <TouchableOpacity onPress={handleClickFollow} activeOpacity={1}>
            <Text style={[styles.fontWeight, { color: followInfo.color }]}>{followInfo.text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    fontWeight: {
        fontWeight: '600',
    },
});

export default Follow;
