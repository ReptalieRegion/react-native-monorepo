import { useNavigation } from '@react-navigation/native';
import { Typo } from 'design-system';
import TouchableTypo from 'design-system/lib/components/Text/TouchableTypo';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { SharePostNavigationProp } from '<SharePostRoutes>';

type CommentContentsHeaderProps = {
    user: {
        nickname: string;
    };
    comment: {
        isModified: boolean;
    };
};

const CommentContentsHeader = ({ user, comment }: CommentContentsHeaderProps) => {
    const navigation = useNavigation<SharePostNavigationProp<'share-post/bottom-sheet/comment'>>();
    const handleProfileClick = () => {
        navigation.push('share-post/modal/detail', { nickname: user.nickname });
    };

    return (
        <View style={styles.container}>
            <TouchableTypo variant="title4" onPress={handleProfileClick}>
                {user.nickname}
            </TouchableTypo>
            {comment.isModified ? (
                <Typo variant="body5" color="placeholder">
                    (수정됨)
                </Typo>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
});

export default CommentContentsHeader;
