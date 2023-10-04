import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';

import type { SharePostCommentParamList, SharePostParamList } from '<RootRoutes>';
import CommentSkeleton from '@/components/share/atoms/Suspense/CommentSkeleton';
import CommentTagListActivityIndicator from '@/components/share/atoms/Suspense/CommentTagListActivityIndicator';
import Comment, { CommentList, CommentTagList, CommentTextEditor } from '@/components/share/organisms/Comment';

type CommentScreenProps = CompositeScreenProps<
    NativeStackScreenProps<SharePostCommentParamList, 'main'>,
    NativeStackScreenProps<SharePostParamList, 'share-post/bottom-sheet/comment'>
>;

export default function CommentPage(props: CommentScreenProps) {
    return (
        <Comment id={props.route.params.post.id}>
            <View style={styles.container}>
                <Suspense fallback={<CommentSkeleton />}>
                    <CommentList {...props} />
                </Suspense>
                <Suspense fallback={<CommentTagListActivityIndicator />}>
                    <CommentTagList />
                </Suspense>
            </View>
            <CommentTextEditor />
        </Comment>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
});
