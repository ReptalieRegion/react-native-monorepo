import clientFetch from '../clientFetch';

import { RequestFollow } from '<SharePostAPI>';

export const getPosts = async () => {
    const response = await clientFetch('api/posts');
    return response.json();
};

export const updateFollow = async (data: RequestFollow) => {
    const response = await clientFetch('api/posts/follow', {
        method: 'POST',
        body: data,
    });
    return response.json;
};

export const getDetailPosts = async (userId: string) => {
    const response = await clientFetch(`api/posts/${userId}`);

    return response.json();
};

export const getCommentPost = async (postId: string) => {
    const response = await clientFetch(`api/posts/${postId}/comment`);

    return response.json();
};

export const getReplyComment = async (commentId: string) => {
    const response = await clientFetch(`api/comment/${commentId}`);

    return response.json();
};
