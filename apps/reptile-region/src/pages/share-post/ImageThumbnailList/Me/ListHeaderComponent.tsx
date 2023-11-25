import React from 'react';

import useMeProfileAndPostCount from '@/apis/share-post/post/hooks/combine/useMeProfileAndPostCount';
import UserProfile from '@/components/share-post/molecules/UserProfile/UserProfile';
import type { FollowRouterParams } from '@/types/routes/params/sharePost';

interface ListHeaderComponentActions {
    navigateFollowerPage(params: FollowRouterParams): void;
}

type ListHeaderComponentProps = ListHeaderComponentActions;

export default function ListHeaderComponent({ navigateFollowerPage }: ListHeaderComponentProps) {
    const { data } = useMeProfileAndPostCount();

    return <UserProfile navigateFollowPage={navigateFollowerPage} user={data.user} postCount={data.postCount} />;
}
