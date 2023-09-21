import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';

import Follow from '../Follow';

import { SharePostUserListParams } from '<RootRoutes>';
import useFetchUserProfile from '@/apis/share-post/user/hooks/queries/useFetchUserProfile';
import BaseHeader from '@/components/common/layouts/header/BaseHeader';

export default function SharePostUserDetailListHeader(props: NativeStackHeaderProps) {
    const params = props.route.params as SharePostUserListParams;
    const nickname = params.nickname;
    const { data } = useFetchUserProfile({ nickname });

    if (!data) {
        return <BaseHeader leftIcon="back" title={nickname} />;
    }

    return (
        <BaseHeader
            leftIcon="back"
            title={nickname}
            right={<Follow user={{ id: data?.user.id, isFollow: data?.user.isFollow }} />}
        />
    );
}
