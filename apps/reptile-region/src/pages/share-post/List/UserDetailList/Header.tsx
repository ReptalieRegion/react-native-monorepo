import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import * as Haptic from 'react-native-haptic-feedback';

import useCreateFollow from '@/apis/share-post/user/hooks/mutations/useCreateFollow';
import useUpdateFollow from '@/apis/share-post/user/hooks/mutations/useUpdateFollow';
import useFetchUserProfile from '@/apis/share-post/user/hooks/queries/useFetchUserProfile';
import { createNativeStackHeader } from '@/components/@common/molecules';
import Follow from '@/components/share-post/atoms/Follow';

type ChangeHeaderProps = {
    nickname: string;
    navigation: any;
};

export function SharePostUserDetailListHeader(props: NativeStackHeaderProps) {
    return createNativeStackHeader({ leftIcon: 'back', title: '' })(props);
}

export default function ChangeHeader({ nickname, navigation }: ChangeHeaderProps) {
    const { data } = useFetchUserProfile({ nickname });
    const { mutate: createFollowMutate } = useCreateFollow();
    const { mutate: updateFollowMutate } = useUpdateFollow();

    useEffect(() => {
        const headerRight = () => {
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

            return <Follow isFollow={data?.user.isFollow} onPress={handlePressFollow} />;
        };

        navigation.setOptions({ headerRight, headerTitle: nickname });
    }, [createFollowMutate, updateFollowMutate, data, navigation, nickname]);

    return null;
}
