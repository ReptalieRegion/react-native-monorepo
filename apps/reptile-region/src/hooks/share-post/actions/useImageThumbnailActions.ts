import { useQueryClient } from '@tanstack/react-query';

import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useCreateOrUpdateFollow from '@/apis/share-post/user/hooks/combine/useCreateOrUpdateFollow';
import type { FetchDetailUserProfile } from '@/types/apis/share-post/user';

type UseImageThumbnailActionsProps = {
    nickname: string;
};

const useImageThumbnailActions = ({ nickname }: UseImageThumbnailActionsProps) => {
    const profileKey = SHARE_POST_QUERY_KEYS.profileDetail(nickname);
    const queryClient = useQueryClient();
    const { mutateFollow } = useCreateOrUpdateFollow({
        create: {
            onMutate: async () => {
                await queryClient.cancelQueries({ queryKey: profileKey });
                const prevUserProfile = queryClient.getQueryData<FetchDetailUserProfile['Response']>(profileKey);
                queryClient.setQueryData<FetchDetailUserProfile['Response']>(profileKey, (prevData) => {
                    if (prevData === undefined) {
                        return prevData;
                    }

                    return {
                        user: {
                            ...prevData.user,
                            isFollow: true,
                            followerCount: prevData.user.followerCount + 1,
                        },
                    };
                });

                return { prevUserProfile };
            },
            onError: (_error, _variables, context) => {
                if (context) {
                    queryClient.setQueryData(
                        profileKey,
                        (context as { prevUserProfile: FetchDetailUserProfile['Response'] }).prevUserProfile,
                    );
                }
            },
        },
        update: {
            onMutate: async () => {
                await queryClient.cancelQueries({ queryKey: profileKey });
                const prevUserProfile = queryClient.getQueryData<FetchDetailUserProfile['Response']>(profileKey);
                queryClient.setQueryData<FetchDetailUserProfile['Response']>(profileKey, (prevData) => {
                    if (prevData === undefined) {
                        return prevData;
                    }

                    const { isFollow, followerCount } = prevData.user;
                    const currentIsFollow = !isFollow;
                    const currentFollowerCount = isFollow ? followerCount - 1 : followerCount + 1;

                    return {
                        ...prevData,
                        user: {
                            ...prevData.user,
                            isFollow: currentIsFollow,
                            followerCount: currentFollowerCount,
                        },
                    };
                });

                return { prevUserProfile };
            },
            onError: (_error, _variables, context) => {
                if (context) {
                    queryClient.setQueryData(
                        profileKey,
                        (context as { prevUserProfile: FetchDetailUserProfile['Response'] }).prevUserProfile,
                    );
                }
            },
        },
    });

    const handlePressFollow = (props: { userId: string; isFollow: boolean | undefined }) => {
        mutateFollow(props);
    };

    return {
        handlePressFollow,
    };
};

export default useImageThumbnailActions;
