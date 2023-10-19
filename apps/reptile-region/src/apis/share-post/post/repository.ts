import type {
    CreateLikeRequest,
    CreatePostRequest,
    DeletePostRequest,
    FetchDetailUserPostRequest,
    FetchLikeRequest,
    FetchPostRequest,
    UpdateLikeRequest,
    UpdatePostRequest,
} from '<api/share/post>';
import type { InfinitePageParam } from '<api/utils>';
import clientFetch, { METHOD } from '@/apis/clientFetch';
import { uploadImage } from '@/utils/camera-roll/camera-roll';
import { objectToQueryString } from '@/utils/network/query-string';

/** GET */
// 게시물 패치
export const getPosts = async ({ pageParam = 0 }: FetchPostRequest) => {
    const queryString = objectToQueryString({
        pageParam,
    });

    const response = await clientFetch(`api/share/posts/list?${queryString}`);

    return response.json();
};

// 특정 유저 게시글 패치
export const getDetailUserPosts = async ({ pageParam = 0, nickname }: FetchDetailUserPostRequest & InfinitePageParam) => {
    const queryString = objectToQueryString({
        pageParam,
    });
    const response = await clientFetch(`api/share/posts/list/users/${nickname}?${queryString}`);

    return response.json();
};

export const getLikes = async ({ pageParam = 0, postId }: FetchLikeRequest & InfinitePageParam) => {
    const queryString = objectToQueryString({
        pageParam,
    });
    const response = await clientFetch(`api/share/posts/${postId}/like/list?${queryString}`);
    return response.json();
};

/** POST */
// 게시글 생성
// TODO Fetch로 이미지 업로드가 안됨
export const createPost = async ({ contents, selectedPhotos }: CreatePostRequest) => {
    const formData = new FormData();
    for (const photo of selectedPhotos) {
        const file = await uploadImage(photo);
        formData.append('files', file as unknown as Blob);
    }
    formData.append('contents', contents);

    const response = await clientFetch('api/share/post', {
        method: METHOD.POST,
        body: formData,
        isFormData: true,
    });

    if (!response.ok) {
        const message = await response.json();
        throw new Error(JSON.stringify(message));
    }

    return response.json();
};

// 좋아요 생성
export const createLike = async ({ postId }: CreateLikeRequest) => {
    const response = await clientFetch(`api/share/posts/${postId}/like`, {
        method: METHOD.POST,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(JSON.parse(error));
    }

    return response.json();
};

/** PUT */
// 특정 게시글 수정
export const updatePost = async ({ postId, contents, remainingImages }: UpdatePostRequest) => {
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
export const updateLike = async ({ postId }: UpdateLikeRequest) => {
    const response = await clientFetch(`api/share/posts/${postId}/like`, {
        method: METHOD.PUT,
    });

    return response.json();
};

/** DELETE */
// 특정 게시글 삭제
export const deletePost = async ({ postId }: DeletePostRequest) => {
    const response = await clientFetch(`api/share/posts/${postId}`, {
        method: METHOD.DELETE,
    });

    return response.json();
};
