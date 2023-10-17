import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { Suspense } from 'react';

import SharePostListSkeleton from '../../loading';
import ChangeHeader from '../Header';

import type { BottomTabNativeStackParamList, SharePostTabParamList } from '<routes/bottom-tab>';
import type { RootRoutesParamList } from '<routes/root>';

type SharePostListPageScreen = CompositeScreenProps<
    NativeStackScreenProps<SharePostTabParamList, 'share-post/list/user'>,
    CompositeScreenProps<NativeStackScreenProps<BottomTabNativeStackParamList>, NativeStackScreenProps<RootRoutesParamList>>
>;

const UserDetailListPage = React.lazy(() => import('./Page'));

export default function SharePostUserDetailListPage(props: SharePostListPageScreen) {
    return (
        <Suspense fallback={<SharePostListSkeleton />}>
            <ChangeHeader nickname={props.route.params.nickname} navigation={props.navigation} />
            <UserDetailListPage {...props} />
        </Suspense>
    );
}
