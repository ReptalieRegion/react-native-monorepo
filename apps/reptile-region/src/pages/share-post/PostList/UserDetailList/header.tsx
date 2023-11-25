import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import * as Haptic from 'react-native-haptic-feedback';

import useCreateOrUpdateFollow from '@/apis/share-post/user/hooks/combine/useCreateOrUpdateFollow';
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
    const { mutateFollow } = useCreateOrUpdateFollow();

    useEffect(() => {
        const headerRight = () => {
            const handlePressFollow = () => {
                if (data === undefined) {
                    return;
                }

                const {
                    user: { id: userId, isFollow },
                } = data;
                Haptic.trigger('impactLight');
                mutateFollow({ userId, isFollow });
            };

            return <Follow isFollow={data?.user.isFollow} onPress={handlePressFollow} />;
        };

        navigation.setOptions({ headerRight, headerTitle: nickname });
    }, [data, navigation, nickname, mutateFollow]);

    return null;
}
