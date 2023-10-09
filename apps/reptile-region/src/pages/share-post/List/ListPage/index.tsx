import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { Suspense } from 'react';

import SharePostListSkeleton from '../loading';

import PostList from './page';

import type { BottomTabNativeStackParamList, SharePostTabParamList } from '<routes/bottom-tab>';
import type { RootRoutesParamList } from '<routes/root>';
import FloatingActionButtons from '@/components/share/organisms/FloatingActionButtons/providers/FloatingActionButtons';

type SharePostListPageScreen = CompositeScreenProps<
    NativeStackScreenProps<SharePostTabParamList, 'share-post/list'>,
    CompositeScreenProps<NativeStackScreenProps<BottomTabNativeStackParamList>, NativeStackScreenProps<RootRoutesParamList>>
>;

export default function SharePostListPage(props: SharePostListPageScreen) {
    return (
        <Suspense fallback={<SharePostListSkeleton />}>
            <FloatingActionButtons>
                <PostList {...props} />
            </FloatingActionButtons>
        </Suspense>
    );
}
