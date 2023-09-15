import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { SharePostNavigationProp } from '<SharePostRoutes>';
import Avatar from '@/components/common/fast-image/Avatar';

type CommentAvatarProps = {
    uri: string;
    nickname: string;
};

const CommentAvatar = ({ uri, nickname }: CommentAvatarProps) => {
    const navigation = useNavigation<SharePostNavigationProp<'share-post/bottom-sheet/comment'>>();
    const handleProfileClick = () => {
        navigation.push('share-post/modal/detail', { nickname });
    };

    return (
        <Avatar
            recyclingKey={uri}
            onPress={handleProfileClick}
            source={{ uri }}
            priority={'high'}
            placeholder={require('@/assets/images/avatar.png')}
            contentFit="cover"
        />
    );
};

export default CommentAvatar;
