import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';

import CommentTagList from '@/components/share-post/comment/atoms/CommentTagList';
import CommentSkeleton from '@/components/share-post/comment/atoms/loading/CommentSkeleton';
import CommentTagListActivityIndicator from '@/components/share-post/comment/atoms/loading/CommentTagListActivityIndicator';
import CommentEditor from '@/components/share-post/comment/molecules/CommentEditor';
import CommentList from '@/components/share-post/comment/templates/CommentList';

const CommentPage = () => {
    return (
        <>
            <View style={styles.container}>
                <Suspense fallback={<CommentSkeleton />}>
                    <CommentList />
                </Suspense>
                <Suspense fallback={<CommentTagListActivityIndicator />}>
                    <CommentTagList />
                </Suspense>
            </View>
            <CommentEditor />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
});

export default CommentPage;
