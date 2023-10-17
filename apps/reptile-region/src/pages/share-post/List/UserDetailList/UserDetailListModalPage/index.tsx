import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { Suspense } from 'react';

import SharePostListSkeleton from '../../loading';
import ChangeHeader from '../Header';

import type { RootRoutesParamList, SharePostModalParamList } from '<routes/root>';

type SharePostListPageScreen = CompositeScreenProps<
    NativeStackScreenProps<SharePostModalParamList, 'list/user'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

const UserDetailListModalPage = React.lazy(() => import('./Page'));

export default function SharePostUserDetailListModalPage(props: SharePostListPageScreen) {
    return (
        <Suspense fallback={<SharePostListSkeleton />}>
            <ChangeHeader nickname={props.route.params.nickname} navigation={props.navigation} />
            <UserDetailListModalPage {...props} />
        </Suspense>
    );
}
