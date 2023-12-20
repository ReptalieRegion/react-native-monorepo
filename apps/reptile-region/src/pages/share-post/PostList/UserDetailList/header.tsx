import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';

import useUpdateOrCreateFollow from './OtherUser/@hooks/useUpdateOrCreateFollow';

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

    const updateOrCreateFollow = useUpdateOrCreateFollow(nickname);

    useEffect(() => {
        const headerRight = () => {
            const handlePressFollow = () => {
                if (data !== undefined) {
                    updateOrCreateFollow({ userId: data?.user.id, isFollow: data?.user.isFollow });
                }
            };

            return <Follow isFollow={data?.user.isFollow} onPress={handlePressFollow} />;
        };

        navigation.setOptions({ headerRight, headerTitle: nickname });
    }, [data, navigation, nickname, updateOrCreateFollow]);

    return null;
}
