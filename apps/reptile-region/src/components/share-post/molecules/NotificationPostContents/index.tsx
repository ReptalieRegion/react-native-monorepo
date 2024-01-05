import { TouchableTypo } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ConditionalRenderer } from '@/components/@common/atoms';
import TaggedContents from '@/pages/share-post/@common/components/TaggedContents';

type PostContentsState = {
    post: {
        likeCount: number;
        contents: string;
        id: string;
    };
};

interface PostContentsActions {
    onPressTag(tag: string): void;
    onPressLikeContents(): void;
}

type PostContentsProps = PostContentsState & PostContentsActions;

export default function NotificationPostContents({
    post: { id: postId, contents, likeCount },
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
