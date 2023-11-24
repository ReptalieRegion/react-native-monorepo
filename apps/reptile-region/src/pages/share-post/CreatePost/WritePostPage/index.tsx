import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { color } from '@reptile-region/design-system';
import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';

import ChangeHeader from './header';

import type { RootRoutesParamList, SharePostPostingParamList } from '<routes/root>';
import { FollowerUserList, FollowerUserListSkeleton, TagProvider } from '@/components/@common/organisms/TagTextInput';
import { ContentsWriting, PhotoRegisterCarousel } from '@/components/share-post/organisms/Posting';

type WritePostScreenProps = CompositeScreenProps<
    NativeStackScreenProps<SharePostPostingParamList, 'write'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

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
