import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';
import { TagProvider } from 'tag-text-input';

import CommentSkeleton from '@/components/share-post/comment/atoms/loading/CommentSkeleton';
import CommentTagListActivityIndicator from '@/components/share-post/comment/atoms/loading/CommentTagListActivityIndicator';
import CommentEditor from '@/components/share-post/comment/molecules/CommentEditor';

const CommentTagList = React.lazy(() => import('@/components/share-post/comment/atoms/CommentTagList'));
const CommentList = React.lazy(() => import('@/components/share-post/comment/templates/CommentList'));

const CommentPage = () => {
    return (
        <TagProvider>
            <View style={styles.container}>
                <Suspense fallback={<CommentSkeleton />}>
                    <CommentList />
                </Suspense>
                <Suspense fallback={<CommentTagListActivityIndicator />}>
                    <CommentTagList />
                </Suspense>
            </View>
            <CommentEditor />
        </TagProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
});

export default CommentPage;
