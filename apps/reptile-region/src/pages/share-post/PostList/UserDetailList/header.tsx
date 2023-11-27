import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import * as Haptic from 'react-native-haptic-feedback';

import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useCreateOrUpdateFollow from '@/apis/share-post/user/hooks/combine/useCreateOrUpdateFollow';
import useFetchUserProfile from '@/apis/share-post/user/hooks/queries/useFetchUserProfile';
import { createNativeStackHeader } from '@/components/@common/molecules';
import Follow from '@/components/share-post/atoms/Follow';
import useAuthNavigation from '@/hooks/@common/useNavigationAuth';
import type { FetchDetailUserProfile } from '@/types/apis/share-post/user';

type ChangeHeaderProps = {
    nickname: string;
    navigation: any;
};

export function SharePostUserDetailListHeader(props: NativeStackHeaderProps) {
    return createNativeStackHeader({ leftIcon: 'back', title: '' })(props);
}

export default function ChangeHeader({ nickname, navigation }: ChangeHeaderProps) {
    const { data } = useFetchUserProfile({ nickname });
    const { requireAuthNavigation } = useAuthNavigation();
    const queryKey = SHARE_POST_QUERY_KEYS.profileDetail(nickname);
    const queryClient = useQueryClient();
    const { mutateFollow } = useCreateOrUpdateFollow({
        create: {
            onMutate: async () => {
                await queryClient.cancelQueries({ queryKey });
                const prevProfile = queryClient.getQueryData<FetchDetailUserProfile['Response']>(queryKey);
                queryClient.setQueryData<FetchDetailUserProfile['Response']>(queryKey, (prevData) => {
                    if (prevData === undefined) {
                        return prevData;
                    }

                    return {
                        user: {
                            ...prevData.user,
                            isFollow: true,
                        },
                    };
                });

                return { prevProfile };
            },
            onError: (_error, _variables, context) => {
                if (context) {
                    queryClient.setQueryData(
                        queryKey,
                        (context as { prevProfile: FetchDetailUserProfile['Response'] }).prevProfile,
                    );
                }
            },
        },
        update: {
            onMutate: async () => {
                await queryClient.cancelQueries({ queryKey });
                const prevProfile = queryClient.getQueryData<FetchDetailUserProfile['Response']>(queryKey);
                queryClient.setQueryData<FetchDetailUserProfile['Response']>(queryKey, (prevData) => {
                    if (prevData === undefined) {
                        return prevData;
                    }

                    return {
                        user: {
                            ...prevData.user,
                            isFollow: !prevData.user.isFollow,
                        },
                    };
                });

                return { prevProfile };
            },
            onError: (_error, _variables, context) => {
                if (context) {
                    queryClient.setQueryData(
                        queryKey,
                        (context as { prevProfile: FetchDetailUserProfile['Response'] }).prevProfile,
                    );
                }
            },
        },
    });

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
                requireAuthNavigation(() => mutateFollow({ userId, isFollow }));
            };

            return <Follow isFollow={data?.user.isFollow} onPress={handlePressFollow} />;
        };

        navigation.setOptions({ headerRight, headerTitle: nickname });
    }, [data, navigation, nickname, mutateFollow, requireAuthNavigation]);

    return null;
}
