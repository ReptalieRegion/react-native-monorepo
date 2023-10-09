import { TouchableTypo, Typo } from 'design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ConditionalRenderer } from '@/components/@common/atoms';
import TaggedContents from '@/components/share/molecules/TaggedContents';

type PostContentsState = {
    post: {
        likeCount: number;
        commentCount: number;
        contents: string;
        id: string;
    };
};

interface PostContentsActions {
    onPressTag(tag: string): void;
    onPressComment(): void;
}

type PostContentsProps = PostContentsState & PostContentsActions;

export default function PostContents({
    post: { id: postId, commentCount, contents, likeCount },
    onPressComment,
    onPressTag,
}: PostContentsProps) {
    return (
        <View style={styles.container}>
            <ConditionalRenderer
                condition={likeCount === 0}
                trueContent={null}
                falseContent={<Typo variant="heading3">{likeCount}명이 좋아합니다.</Typo>}
            />
            <TaggedContents uuid={postId} contents={contents} onPressTag={onPressTag} />
            <ConditionalRenderer
                condition={commentCount === 0}
                trueContent={null}
                falseContent={
                    <TouchableTypo variant="body2" color="placeholder" onPress={onPressComment}>
                        댓글 {commentCount}개 모두 보기
                    </TouchableTypo>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        gap: 5,
    },
    content: {
        overflow: 'hidden',
    },
});