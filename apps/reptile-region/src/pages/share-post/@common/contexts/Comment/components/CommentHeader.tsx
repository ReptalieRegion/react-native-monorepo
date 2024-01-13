import { TouchableTypo, Typo } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ConditionalRenderer } from '@/components/@common/atoms';
import { calculateTimeAgo } from '@/utils/date';

type CommentHeaderState = {
    comment: {
        createdAt: string;
        isModified: boolean;
        user: {
            nickname: string;
        };
    };
};

interface CommentHeaderActions {
    onPressNickname(): void;
}

export type CommentHeaderProps = CommentHeaderState & CommentHeaderActions;

export default function CommentHeader({
    comment: {
        createdAt,
        isModified,
        user: { nickname },
    },
    onPressNickname,
}: CommentHeaderProps) {
    return (
        <View style={styles.contentHeaderContainer}>
            <TouchableTypo variant="title4" onPress={onPressNickname}>
                {nickname}
            </TouchableTypo>
            <Typo variant="body4" color="placeholder">
                {calculateTimeAgo(createdAt)}
            </Typo>
            <ConditionalRenderer
                condition={isModified}
                trueContent={
                    <Typo variant="body4" color="placeholder">
                        (수정됨)
                    </Typo>
                }
                falseContent={null}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    contentHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
});
