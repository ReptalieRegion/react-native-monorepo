import React from 'react';
import { ColorValue, StyleSheet, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as Haptic from 'react-native-haptic-feedback';

import type { SharePostListData } from '<SharePostAPI>';
import useCreateFollow from '@/apis/share-post/user/hooks/mutations/useCreateFollow';
import useUpdateFollow from '@/apis/share-post/user/hooks/mutations/useUpdateFollow';
import { color } from '@/components/common/tokens/colors';

type PostHeaderProps = {
    user: Pick<SharePostListData['user'], 'isFollow' | 'id'>;
};

interface FollowInfo {
    color: ColorValue;
    text: string;
}

const following: FollowInfo = { color: color.Gray[500].toString(), text: '✓ 팔로잉' };
const follow: FollowInfo = { color: color.Green[750].toString(), text: '팔로우' };

const makeFollowInfo = (isFollow: boolean | undefined) => {
    return isFollow ? following : follow;
};

const Follow = ({ user: { isFollow, id: userId } }: PostHeaderProps) => {
    const { mutate: createMutate } = useCreateFollow({ userId });
    const { mutate: updateMutate } = useUpdateFollow({ userId });

    const handleClickFollow = () => {
        if (isFollow === undefined) {
            createMutate();
        } else {
            updateMutate();
        }
        Haptic.trigger('impactLight');
    };

    const followInfo = makeFollowInfo(isFollow);

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
