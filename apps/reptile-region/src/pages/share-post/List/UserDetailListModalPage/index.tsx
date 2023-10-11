import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackHeaderProps, NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { Suspense } from 'react';
import * as Haptic from 'react-native-haptic-feedback';

import SharePostListSkeleton from '../loading';

import UserDetailListModalPage from './page';

import type { RootRoutesParamList, SharePostModalParamList, SharePostUserListProps } from '<routes/root>';
import useCreateFollow from '@/apis/share-post/user/hooks/mutations/useCreateFollow';
import useUpdateFollow from '@/apis/share-post/user/hooks/mutations/useUpdateFollow';
import useFetchUserProfile from '@/apis/share-post/user/hooks/queries/useFetchUserProfile';
import { ConditionalRenderer } from '@/components/@common/atoms';
import { BaseHeader } from '@/components/@common/molecules';
import Follow from '@/components/share-post/atoms/Follow';

type SharePostListPageScreen = CompositeScreenProps<
    NativeStackScreenProps<SharePostModalParamList, 'list/user'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

export function SharePostUserDetailListModalHeader(props: NativeStackHeaderProps) {
    const params = props.route.params as SharePostUserListProps;
    const nickname = params.nickname;
    const { data } = useFetchUserProfile({ nickname });
    const { mutate: createFollowMutate } = useCreateFollow();
    const { mutate: updateFollowMutate } = useUpdateFollow();

    const handlePressFollow = () => {
        if (data === undefined) {
            return;
        }

        const {
            user: { id: userId, isFollow },
        } = data;

        if (isFollow === undefined) {
            createFollowMutate({ userId });
        } else {
            updateFollowMutate({ userId });
        }
        Haptic.trigger('impactLight');
    };

    return (
        <ConditionalRenderer
            condition={!!data}
            trueContent={<BaseHeader leftIcon="back" title={nickname} />}
            falseContent={
                <BaseHeader
                    leftIcon="back"
                    title={nickname}
                    right={<Follow isFollow={data?.user.isFollow} onPress={handlePressFollow} />}
                />
            }
        />
    );
}

export default function SharePostUserDetailListModalPage(props: SharePostListPageScreen) {
    return (
        <Suspense fallback={<SharePostListSkeleton />}>
            <UserDetailListModalPage {...props} />
        </Suspense>
    );
}
