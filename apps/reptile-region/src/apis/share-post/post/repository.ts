import clientFetch, { METHOD } from '@/apis/@utils/fetcher';
import { objectToQueryString } from '@/apis/@utils/parser/query-string';
import { wait } from '@/mocks/utils/helpers';
import type {
    CreateLike,
    CreatePost,
    DeletePost,
    FetchDetailUserPost,
    FetchLike,
    FetchPost,
    FetchPosts,
    UpdateLike,
    UpdatePost,
} from '@/types/apis/share-post/post';
import type { WithInfinitePageParam } from '@/types/apis/utils';
import { uploadImage } from '@/utils/camera-roll/camera-roll';

/**
 *
 * GET
 */
// 게시물 패치
export const getPosts = async ({ pageParam }: WithInfinitePageParam<FetchPosts['Request']>) => {
    const queryString = objectToQueryString({
        pageParam,
    });

    const response = await clientFetch(`api/share/posts/list?${queryString}`, {
        method: METHOD.GET,
    });

    return response.json();
};

// 특정 게시물 패치
export const getPost = async ({ postId }: FetchPost['Request']) => {
    const response = await clientFetch(`api/share/posts/${postId}`, {
        method: METHOD.GET,
    });

    return response.json();
};

export const fetchMePostList = async ({ pageParam }: WithInfinitePageParam<void>) => {
    const queryString = objectToQueryString({
        pageParam,
    });
    const response = await clientFetch(`api/share/posts/list/me?${queryString}`, {
        method: METHOD.GET,
    });

    return response.json();
};

// 특정 유저 게시글 패치
export const getDetailUserPosts = async ({ pageParam, nickname }: WithInfinitePageParam<FetchDetailUserPost['Request']>) => {
    const queryString = objectToQueryString({
        pageParam,
    });
    const response = await clientFetch(`api/share/posts/list/users/${nickname}?${queryString}`, {
        method: METHOD.GET,
    });

    return response.json();
};

export const getLikes = async ({ pageParam, postId }: WithInfinitePageParam<FetchLike['Request']>) => {
    const queryString = objectToQueryString({
        pageParam,
    });
    const response = await clientFetch(`api/share/posts/${postId}/like/list?${queryString}`);
    await wait(3000);

    return response.json();
};

/**
 *
 * POST
 */
// 게시글 생성
export const createPost = async ({ contents, selectedPhotos }: CreatePost['Request']) => {
    const formData = new FormData();
    for (const photo of selectedPhotos) {
        const file = await uploadImage(photo);
        console.log(file);
        formData.append('files', file as unknown as Blob);
    }
    formData.append('contents', contents);

    const response = await clientFetch('api/share/post', {
        method: METHOD.POST,
        body: formData,
        isFormData: true,
    });

    return response.json();
};

// 좋아요 생성
export const createLike = async ({ postId }: CreateLike['Request']) => {
    const response = await clientFetch(`api/share/posts/${postId}/like`, {
        method: METHOD.POST,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(JSON.parse(error));
    }

    return response.json();
};

/**
 *
 * PUT
 */
// 특정 게시글 수정
export const updatePost = async ({ postId, contents, remainingImages }: UpdatePost['Request']) => {
    const body = {
        remainingImages,
        contents,
    };

    const response = await clientFetch(`api/share/posts/${postId}`, {
        method: METHOD.PUT,
        body,
    });

    return response.json();
};

// 특정 게시글 좋아요 토글
export const updateLike = async ({ postId }: UpdateLike['Request']) => {
    const response = await clientFetch(`api/share/posts/${postId}/like`, {
        method: METHOD.PUT,
    });

    return response.json();
};

/**
 *
 * DELETE
 */
// 특정 게시글 삭제
export const deletePost = async ({ postId }: DeletePost['Request']) => {
    const response = await clientFetch(`api/share/posts/${postId}`, {
        method: METHOD.DELETE,
    });

    return response.json();
};
