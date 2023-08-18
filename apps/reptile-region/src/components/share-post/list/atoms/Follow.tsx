import React, { useState } from 'react';
import { ColorValue, StyleSheet, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { SharePostListData } from '<SharePostListAPI>';
import { color } from '../../../common/tokens/colors';
import Haptic from '../../../../utils/webview-bridge/react-native/haptic/Haptic';

type PostHeaderProps = Pick<SharePostListData, 'isFollow'>;

interface FollowInfo {
    color: ColorValue;
    text: string;
}

const following: FollowInfo = { color: color.Gray[500].toString(), text: '✓ 팔로잉' };
const follow: FollowInfo = { color: color.Green[750].toString(), text: '팔로우' };

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
            <Text style={[styles.fontWeight, { color: followInfo.color }]}>{followInfo.text}</Text>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    fontWeight: {
        fontWeight: '600',
    },
});

export default Follow;
