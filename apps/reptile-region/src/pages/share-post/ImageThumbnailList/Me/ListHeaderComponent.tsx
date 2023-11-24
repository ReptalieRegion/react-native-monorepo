import React from 'react';

import type { SharePostFollowProps } from '<routes/root>';
import useMeProfileAndPostCount from '@/apis/share-post/post/hooks/combine/useMeProfileAndPostCount';
import UserProfile from '@/components/share-post/molecules/UserProfile/UserProfile';

interface ListHeaderComponentActions {
    navigateFollowerPage(params: SharePostFollowProps): void;
}

type ListHeaderComponentProps = ListHeaderComponentActions;

export default function ListHeaderComponent({ navigateFollowerPage }: ListHeaderComponentProps) {
    const { data } = useMeProfileAndPostCount();

    return <UserProfile navigateFollowPage={navigateFollowerPage} user={data.user} postCount={data.postCount} />;
}
