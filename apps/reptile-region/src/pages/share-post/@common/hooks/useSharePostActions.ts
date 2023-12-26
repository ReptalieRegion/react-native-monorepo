import { QueryClient, useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { useCallback } from 'react';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { MY_QUERY_KEYS, SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useCreateOrUpdateLike from '@/apis/share-post/post/hooks/combine/useCreateOrUpdateLike';
import useOnlyLike from '@/apis/share-post/post/hooks/combine/useOnlyLike';
import useCreateOrUpdateFollow from '@/apis/share-post/user/hooks/combine/useCreateOrUpdateFollow';
import useAuthNavigation from '@/hooks/auth/useNavigationAuth';
import type { CustomQueryKey } from '@/types/apis/react-query';
import type { CreateLike, FetchPost, FetchPosts, FetchPostsResponse, UpdateLike } from '@/types/apis/share-post/post';
import type { CreateFollow, UpdateFollow } from '@/types/apis/share-post/user';
import type { InfiniteState } from '@/types/apis/utils';

type MutateLikeProps = CreateLike['Request'] | UpdateLike['Request'];

type MutateFollowProps = CreateFollow['Request'] | UpdateFollow['Request'];

type OptionProps = {
    queryClient: QueryClient;
    key: CustomQueryKey;
};

interface PostListKey {
    type: 'POST';
}

interface PostDetail {
    type: 'POST_DETAIL';
    postId: string;
}

interface UserDetailKey {
    type: 'USER_DETAIL';
    nickname: string;
}

interface MeUserDetailKey {
    type: 'ME_USER_DETAIL';
}

type UseSharePostProps = PostListKey | UserDetailKey | MeUserDetailKey | PostDetail;

interface ReturnActions {
    handlePressHeart(props: { isLike: boolean | undefined; postId: string }): void;
    handleDoublePressImageCarousel(props: { isLike: boolean | undefined; postId: string }): void;
    handlePressFollow(props: { isFollow: boolean | undefined; userId: string }): void;
}

const createLikeKey = (props: UseSharePostProps) => {
    switch (props.type) {
        case 'POST':
            return SHARE_POST_QUERY_KEYS.list;
        case 'ME_USER_DETAIL':
            return MY_QUERY_KEYS.post;
        case 'USER_DETAIL':
            return SHARE_POST_QUERY_KEYS.detailUserPosts(props.nickname);
        case 'POST_DETAIL':
            return SHARE_POST_QUERY_KEYS.post(props.postId);
    }
};

export default function useSharePostActions(props: UseSharePostProps): ReturnActions {
    const listKey = createLikeKey(props);
    const queryClient = useQueryClient();
    const { requireAuthNavigation } = useAuthNavigation();

    const handleCreateMutate = useCallback(
        (mutateProps: MutateLikeProps) => {
            if (props.type === 'POST_DETAIL') {
                handleCreateLikeMutateProfileDetail(mutateProps, { queryClient, key: listKey });
            } else {
                handleCreateLikeMutate(mutateProps, { queryClient, key: listKey });
            }
        },
        [listKey, props.type, queryClient],
    );

    const handleUpdateMutate = useCallback(
        (mutateProps: MutateLikeProps) => {
            if (props.type === 'POST_DETAIL') {
                handleUpdateLikeMutateProfileDetail(mutateProps, { queryClient, key: listKey });
            } else {
                handleUpdateLikeMutate(mutateProps, { queryClient, key: listKey });
            }
        },
        [listKey, props.type, queryClient],
    );

    const handleLikeCreateOrUpdateError = useCallback(
        (_error: HTTPError, _variables: CreateLike['Request'] | UpdateLike['Request'], context: unknown) => {
            handleLikeError(_error, _variables, context, { queryClient, key: listKey });
        },
        [listKey, queryClient],
    );

    const handleFollowCreateMutate = useCallback(
        (mutateProps: MutateFollowProps) => {
            if (props.type === 'POST') {
                handleCreatePostMutate(mutateProps, { queryClient, key: SHARE_POST_QUERY_KEYS.list });
            } else if (props.type === 'POST_DETAIL') {
                handleCreatePostDetailMutate(mutateProps, { queryClient, key: SHARE_POST_QUERY_KEYS.post(props.postId) });
            }
        },
        [props, queryClient],
    );

    const handleFollowUpdateMutate = useCallback(
        (mutateProps: MutateFollowProps) => {
            if (props.type === 'POST') {
                handleUpdatePostMutate(mutateProps, { queryClient, key: SHARE_POST_QUERY_KEYS.list });
            } else if (props.type === 'POST_DETAIL') {
                handleUpdatePostDetailMutate(mutateProps, { queryClient, key: SHARE_POST_QUERY_KEYS.post(props.postId) });
            }
        },
        [props, queryClient],
    );

    const { mutateOnlyLike } = useOnlyLike({
        create: {
            onMutate: handleCreateMutate,
            onError: handleLikeCreateOrUpdateError,
        },
        update: {
            onMutate: handleUpdateMutate,
            onError: handleLikeCreateOrUpdateError,
        },
    });

    const { mutateLike } = useCreateOrUpdateLike({
        create: {
            onMutate: handleCreateMutate,
            onError: handleLikeCreateOrUpdateError,
        },
        update: {
            onMutate: handleUpdateMutate,
            onError: handleLikeCreateOrUpdateError,
        },
    });

    const { mutateFollow } = useCreateOrUpdateFollow({
        create: {
            onMutate: handleFollowCreateMutate,
        },
        update: {
            onMutate: handleFollowUpdateMutate,
        },
    });

    return {
        handlePressHeart: (likeProps) => requireAuthNavigation(() => mutateLike(likeProps)),
        handleDoublePressImageCarousel: (likeProps) => requireAuthNavigation(() => mutateOnlyLike(likeProps)),
        handlePressFollow: (followProps) => requireAuthNavigation(() => mutateFollow(followProps)),
    };
}

/**
 *
 * React query 낙관적 업데이트
 */
async function handleCreateLikeMutateProfileDetail(_props: MutateLikeProps, { queryClient, key }: OptionProps) {
    await queryClient.cancelQueries({ queryKey: key });
    const prevList = queryClient.getQueryData<FetchPost['Response']>(key);
    queryClient.setQueryData<FetchPost['Response']>(key, (prevData) => {
        if (prevData === undefined) {
            return prevData;
        }

        return {
            post: {
                ...prevData.post,
                isLike: true,
                likeCount: prevData.post.likeCount + 1,
            },
        };
    });

    return { prevList };
}

async function handleCreateLikeMutate({ postId }: MutateLikeProps, { queryClient, key }: OptionProps) {
    await queryClient.cancelQueries({ queryKey: key });
    const prevList = queryClient.getQueryData<InfiniteData<FetchPosts['Response'], number>>(key);
    queryClient.setQueryData<InfiniteData<FetchPosts['Response'], number>>(key, (prevData) => {
        if (prevData === undefined) {
            return prevData;
        }

        const { pages, pageParams } = prevData;
        const updatePages = [...pages].map((page) => ({
            nextPage: page.nextPage,
            items: page.items.map((item) => {
                const isTargetPost = item.post.id === postId;
                return isTargetPost ? { post: { ...item.post, isLike: true, likeCount: item.post.likeCount + 1 } } : item;
            }),
        }));

        return {
            pageParams,
            pages: updatePages,
        };
    });

    return { prevList };
}

async function handleUpdateLikeMutateProfileDetail(_props: MutateLikeProps, { queryClient, key }: OptionProps) {
    await queryClient.cancelQueries({ queryKey: key });
    const prevList = queryClient.getQueryData<FetchPost['Response']>(key);
    queryClient.setQueryData<FetchPost['Response']>(key, (prevData) => {
        if (prevData === undefined) {
            return prevData;
        }

        const { isLike, likeCount } = prevData.post;

        return {
            post: {
                ...prevData.post,
                isLike: !isLike,
                likeCount: isLike ? likeCount - 1 : likeCount + 1,
            },
        };
    });

    return { prevList };
}

async function handleUpdateLikeMutate({ postId }: MutateLikeProps, { queryClient, key }: OptionProps) {
    await queryClient.cancelQueries({ queryKey: key });
    const prevList = queryClient.getQueryData<InfiniteData<FetchPosts['Response'], number>>(key);
    queryClient.setQueryData<InfiniteData<FetchPosts['Response'], number>>(key, (prevData) => {
        if (prevData === undefined) {
            return prevData;
        }

        const { pages, pageParams } = prevData;
        const updatePages = [...pages].map((page) => ({
            nextPage: page.nextPage,
            items: page.items.map((item) => {
                const isTargetPost = item.post.id === postId;
                const { isLike, likeCount } = item.post;
                return isTargetPost
                    ? { post: { ...item.post, isLike: !isLike, likeCount: isLike ? likeCount - 1 : likeCount + 1 } }
                    : item;
            }),
        }));

        return {
            pageParams,
            pages: updatePages,
        };
    });

    return { prevList };
}

function handleLikeError(_error: HTTPError, _variables: MutateLikeProps, context: unknown, { key, queryClient }: OptionProps) {
    if (context) {
        queryClient.setQueryData(
            key,
            (context as { prevList: InfiniteData<InfiniteState<FetchPostsResponse[]>, number> | undefined }).prevList,
        );
    }
}

async function handleCreatePostMutate({ userId }: MutateFollowProps, { queryClient, key }: OptionProps) {
    await queryClient.cancelQueries({ queryKey: key });
    const prevPostList = queryClient.getQueryData<InfiniteData<FetchPosts['Response'], number>>(key);
    queryClient.setQueryData<InfiniteData<FetchPosts['Response'], number>>(key, (prevData) => {
        if (prevData === undefined) {
            return prevData;
        }

        const { pageParams, pages } = prevData;

        const updatePages = [...pages].map((page) => {
            const { items, nextPage } = page;
            return {
                nextPage,
                items: items.map((item) => {
                    const isTargetPost = item.post.user.id === userId;
                    return isTargetPost ? { post: { ...item.post, user: { ...item.post.user, isFollow: true } } } : item;
                }),
            };
        });

        return {
            pageParams,
            pages: updatePages,
        };
    });

    return { prevPostList };
}

async function handleUpdatePostMutate({ userId }: MutateFollowProps, { queryClient, key }: OptionProps) {
    await queryClient.cancelQueries({ queryKey: key });
    const prevPostList = queryClient.getQueryData<InfiniteData<FetchPosts['Response'], number>>(key);
    queryClient.setQueryData<InfiniteData<FetchPosts['Response'], number>>(key, (prevData) => {
        if (prevData === undefined) {
            return prevData;
        }

        const { pageParams, pages } = prevData;

        const updatePages = [...pages].map((page) => {
            const { items, nextPage } = page;
            return {
                nextPage,
                items: items.map((item) => {
                    const isTargetPost = item.post.user.id === userId;
                    return isTargetPost
                        ? { post: { ...item.post, user: { ...item.post.user, isFollow: !item.post.user.isFollow } } }
                        : item;
                }),
            };
        });

        return {
            pageParams,
            pages: updatePages,
        };
    });

    return { prevPostList };
}

async function handleCreatePostDetailMutate(_props: MutateFollowProps, { queryClient, key }: OptionProps) {
    await queryClient.cancelQueries({ queryKey: key });
    const prevPost = queryClient.getQueryData<FetchPost['Response']>(key);
    queryClient.setQueryData<FetchPost['Response']>(key, (prevData) => {
        if (prevData === undefined) {
            return prevData;
        }

        return {
            post: {
                ...prevData.post,
                user: {
                    ...prevData.post.user,
                    isFollow: true,
                },
            },
        };
    });

    return { prevPost };
}

async function handleUpdatePostDetailMutate(_props: MutateFollowProps, { queryClient, key }: OptionProps) {
    await queryClient.cancelQueries({ queryKey: key });
    const prevPost = queryClient.getQueryData<FetchPost['Response']>(key);
    queryClient.setQueryData<FetchPost['Response']>(key, (prevData) => {
        if (prevData === undefined) {
            return prevData;
        }

        return {
            post: {
                ...prevData.post,
                user: {
                    ...prevData.post.user,
                    isFollow: !prevData.post.user.isFollow,
                },
            },
        };
    });

    return { prevPost };
}
