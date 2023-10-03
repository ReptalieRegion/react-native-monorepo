import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';

import { SharePostCommentParamList, SharePostParamList } from '<RootRoutes>';
import Comment, { CommentList, CommentTagList, CommentTextEditor } from '@/components/share/organisms/Comment';
import CommentSkeleton from '@/components/share-post/comment/atoms/loading/CommentSkeleton';
import CommentTagListActivityIndicator from '@/components/share-post/comment/atoms/loading/CommentTagListActivityIndicator';

type CommentScreenProps = CompositeScreenProps<
    NativeStackScreenProps<SharePostCommentParamList, 'main'>,
    NativeStackScreenProps<SharePostParamList, 'share-post/bottom-sheet/comment'>
>;

export default function CommentPage(props: CommentScreenProps) {
    return (
        <Comment>
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
