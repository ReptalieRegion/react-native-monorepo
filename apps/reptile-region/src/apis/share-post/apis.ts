import clientFetch from '../clientFetch';

import { RequestFollow } from '<SharePostRequestFollow>';

export const getPosts = async ({ pageParam = 0 }) => {
    const response = await clientFetch(`api/share-posts?pageParam=${pageParam}`);
    return response.json();
};

export const updateFollow = async (data: RequestFollow) => {
    const response = await clientFetch('api/share-posts/follow', {
        method: 'POST',
        body: data,
    });
    return response.json;
};

export const getDetailPosts = async (userId: string) => {
    const response = await clientFetch(`api/share-posts/${userId}`);

    return response.json();
};

export const getCommentPost = async ({ pageParam = 0, postId }: { pageParam: number; postId: string }) => {
    const response = await clientFetch(`api/share-posts/${postId}/comment?pageParam=${pageParam}`);

    return response.json();
};

export const getReplyComment = async ({
    pageParam = 0,
    postId,
    commentId,
}: {
    pageParam: number;
    postId: string;
    commentId: string;
}) => {
    const response = await clientFetch(`api/share-posts/${postId}/comment/${commentId}?pageParam=${pageParam}`);

    return response.json();
};
