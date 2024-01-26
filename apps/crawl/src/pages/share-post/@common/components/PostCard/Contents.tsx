import { TouchableTypo, Typo } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ConditionalRenderer } from '@/components/@common/atoms';
import TaggedContents from '@/pages/share-post/@common/components/TaggedContents';
import { calculateTimeAgo } from '@/utils/date';

type PostContentsState = {
    post: {
        likeCount: number;
        commentCount: number;
        contents: string;
        id: string;
        createdAt: string;
    };
};

interface PostContentsActions {
    onPressTag(tag: string): void;
    onPressComment(): void;
    onPressLikeContents(): void;
}

type PostContentsProps = PostContentsState & PostContentsActions;

export default function PostCardContents({
    post: { id: postId, commentCount, contents, likeCount, createdAt },
    onPressComment,
    onPressTag,
    onPressLikeContents,
}: PostContentsProps) {
    return (
        <View style={styles.container}>
            <ConditionalRenderer
                condition={likeCount === 0}
                trueContent={null}
                falseContent={
                    <TouchableTypo variant="heading2" onPress={onPressLikeContents}>
                        {likeCount}명이 좋아합니다.
                    </TouchableTypo>
                }
            />
            <TaggedContents uuid={postId} contents={contents} onPressTag={onPressTag} />
            <ConditionalRenderer
                condition={commentCount === 0}
                trueContent={null}
                falseContent={
                    <TouchableTypo variant="title4" color="placeholder" onPress={onPressComment}>
                        댓글 {commentCount}개 모두 보기
                    </TouchableTypo>
                }
            />
            <Typo variant="body4" color="placeholder">
                {calculateTimeAgo(createdAt)}
            </Typo>
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
