import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';
import { TagProvider } from 'tag-text-input';

import CommentReplySkeleton from '@/components/share-post/comment/atoms/loading/CommentReplySkeleton';
import CommentTagListActivityIndicator from '@/components/share-post/comment/atoms/loading/CommentTagListActivityIndicator';
import CommentReplyEditor from '@/components/share-post/comment/molecules/CommentReplyEditor';

const CommentTagList = React.lazy(() => import('@/components/share-post/comment/atoms/CommentTagList'));
const CommentReplyList = React.lazy(() => import('@/components/share-post/comment/templates/CommentReplyList'));

const CommentReplyPage = () => {
    return (
        <TagProvider>
            <View style={styles.container}>
                <Suspense fallback={<CommentReplySkeleton />}>
                    <CommentReplyList />
                </Suspense>
                <Suspense fallback={<CommentTagListActivityIndicator />}>
                    <CommentTagList />
                </Suspense>
            </View>
            <CommentReplyEditor />
        </TagProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
});

export default CommentReplyPage;
