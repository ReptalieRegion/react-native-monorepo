import React, { useState } from 'react';
import { ColorValue, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { SharePostsData } from '<SharePostAPI>';
import Haptic from '@/utils/webview-bridge/react-native/haptic/Haptic';

type PostHeaderProps = Pick<SharePostsData, 'isFollow'>;

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
        Haptic.trigger({ type: 'impactLight' });
        setIsFollowing((state) => !state);
    };

    return (
        <TouchableWithoutFeedback onPress={handleClickFollow}>
            <View>
                <Text style={[styles.fontWeight, { color: followInfo.color }]}>{followInfo.text}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    fontWeight: {
        fontWeight: '600',
    },
});

export default Follow;
