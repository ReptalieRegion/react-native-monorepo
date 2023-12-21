import { color } from '@crawl/design-system';
import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';

import { PhotoRegisterCarousel } from './@components';
import ContentsWriting from './@components/ContentWriting';
import ChangeHeader from './header';

import { FollowerUserList, FollowerUserListSkeleton, TagProvider } from '@/components/@common/organisms/TagTextInput';
import type { WritePostScreenProps } from '@/types/routes/props/share-post/create-post';

export default function WritePostPage({ navigation }: WritePostScreenProps) {
    return (
        <TagProvider>
            <ChangeHeader navigation={navigation} />
            <View style={styles.container}>
                <ContentsWriting />
                <View style={styles.relative}>
                    <Suspense fallback={<FollowerUserListSkeleton />}>
                        <FollowerUserList containerStyles={styles.followerUserListContainer} />
                    </Suspense>
                    <PhotoRegisterCarousel />
                </View>
            </View>
        </TagProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.White.toString(),
        flex: 1,
        padding: 20,
    },
    relative: {
        position: 'relative',
        flex: 1,
    },
    followerUserListContainer: {
        flex: 1,
        marginBottom: 20,
        gap: 10,
    },
});
