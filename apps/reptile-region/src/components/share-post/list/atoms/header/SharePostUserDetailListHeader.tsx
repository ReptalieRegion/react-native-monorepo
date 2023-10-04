import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';

import type { SharePostUserListParams } from '<RootRoutes>';
import useFetchUserProfile from '@/apis/share-post/user/hooks/queries/useFetchUserProfile';
import { ConditionalRenderer } from '@/components/@common/atoms';
import { BaseHeader } from '@/components/@common/molecules';
import Follow from '@/components/share/atoms/Follow';

export default function SharePostUserDetailListHeader(props: NativeStackHeaderProps) {
    const params = props.route.params as SharePostUserListParams;
    const nickname = params.nickname;
    const { data } = useFetchUserProfile({ nickname });

    return (
        <ConditionalRenderer
            condition={!!data}
            trueContent={<BaseHeader leftIcon="back" title={nickname} />}
            falseContent={
                <BaseHeader
                    leftIcon="back"
                    title={nickname}
                    right={<Follow user={{ id: data?.user.id ?? '', isFollow: data?.user.isFollow }} />}
                />
            }
        />
    );
}
