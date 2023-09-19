import { Typo } from 'design-system';
import { TouchableTypo } from 'design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import ConditionalRendererWithNull from '@/components/common/element/ConditionalRendererWithNull';
import useCommentNavigation from '@/hooks/navigation/useCommentNavigation';

type CommentContentsHeaderProps = {
    user: {
        nickname: string;
    };
    comment: {
        isModified: boolean;
    };
};

const CommentContentsHeader = ({ user, comment }: CommentContentsHeaderProps) => {
    const { navigationModalDetail } = useCommentNavigation();

    return (
        <View style={styles.container}>
            <TouchableTypo variant="title4" onPress={() => navigationModalDetail(user.nickname)}>
                {user.nickname}
            </TouchableTypo>
            <ConditionalRendererWithNull condition={comment.isModified}>
                <Typo variant="body5" color="placeholder">
                    (수정됨)
                </Typo>
            </ConditionalRendererWithNull>
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
