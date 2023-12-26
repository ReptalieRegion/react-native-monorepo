import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';

import CommentSkeleton from './loading';

import { FollowerUserList, FollowerUserListSkeleton } from '@/components/@common/organisms/TagTextInput';
import Comment, { CommentTextEditor } from '@/components/share-post/organisms/Comment';
import type { CommentScreenProps } from '@/types/routes/props/share-post/comment';

const CommentList = React.lazy(() => import('./page'));

export default function CommentPage(props: CommentScreenProps) {
    return (
        <Comment id={props.route.params.post.id}>
            <View style={styles.container} onLayout={(e) => console.log(e.nativeEvent)}>
                <Suspense fallback={<CommentSkeleton />}>
                    <CommentList {...props} />
                </Suspense>
                <Suspense fallback={<FollowerUserListSkeleton />}>
                    <FollowerUserList containerStyles={styles.followerUserListContainer} />
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
        minHeight: 2,
    },
    followerUserListContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        paddingLeft: 20,
        paddingTop: 10,
        backgroundColor: 'white',
    },
});
