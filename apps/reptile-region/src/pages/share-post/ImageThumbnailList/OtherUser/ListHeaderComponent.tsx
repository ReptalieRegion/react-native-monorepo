import React from 'react';

import useUserProfileAndPostCount from '@/apis/share-post/post/hooks/combine/useUserProfileAndPostCount';
import UserProfile from '@/components/share-post/molecules/UserProfile/UserProfile';
import type { ImageType } from '@/types/global/image';
import type { FollowRouterParams } from '@/types/routes/params/sharePost';

type ListHeaderComponentState = {
    isFollow: boolean | undefined;
    nickname: string;
    profile: ImageType;
};

interface ListHeaderComponentActions {
    navigateFollowerPage(params: FollowRouterParams): void;
}

type ListHeaderComponentProps = ListHeaderComponentState & ListHeaderComponentActions;

export default function ListHeaderComponent({ isFollow, nickname, profile, navigateFollowerPage }: ListHeaderComponentProps) {
    const { data } = useUserProfileAndPostCount({ isFollow, nickname, profile });

    return <UserProfile navigateFollowPage={navigateFollowerPage} user={data.user} postCount={data.postCount} />;
}
