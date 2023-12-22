import { color } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import ChangeHeader from './header';

import useToast from '@/components/overlay/Toast/useToast';
import PostUpdate from '@/components/share-post/organisms/PostUpdate/providers/PostUpdate';
import type { SharePostUpdateScreen } from '@/types/routes/props/share-post/update-post';

export default function SharePostUpdatePage({
    navigation,
    route: {
        params: { post },
    },
}: SharePostUpdateScreen) {
    const openToast = useToast();

    const handleToast = () => {
        openToast({
            severity: 'warning',
            contents: '이미지는 최소 1개이상이어야 합니다.',
        });
    };

    return (
        <PostUpdate minImageCountCallback={handleToast}>
            <View style={styles.wrapper}>
                <ChangeHeader postId={post.id} navigation={navigation} />
                <PostUpdate.List images={post.images} contents={post.contents} />
            </View>
        </PostUpdate>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
});
