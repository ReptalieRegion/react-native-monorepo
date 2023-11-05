import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Typo } from '@reptile-region/design-system';
import { ErrorBoundary } from '@reptile-region/error-boundary';
import React, { Suspense } from 'react';

import SharePostListSkeleton from '../loading';

import PostList from './page';

import type { BottomTabNativeStackParamList, SharePostTabParamList } from '<routes/bottom-tab>';
import type { RootRoutesParamList } from '<routes/root>';
import FloatingActionButtons from '@/components/share-post/organisms/FloatingActionButtons/providers/FloatingActionButtons';

type SharePostListPageScreen = CompositeScreenProps<
    NativeStackScreenProps<SharePostTabParamList, 'share-post/list'>,
    CompositeScreenProps<NativeStackScreenProps<BottomTabNativeStackParamList>, NativeStackScreenProps<RootRoutesParamList>>
>;

export default function SharePostListPage(props: SharePostListPageScreen) {
    return (
        <Suspense fallback={<SharePostListSkeleton />}>
            <ErrorBoundary renderFallback={({ error }) => <Typo>{error.message}</Typo>}>
                <FloatingActionButtons>
                    <PostList {...props} />
                </FloatingActionButtons>
            </ErrorBoundary>
        </Suspense>
    );
}
