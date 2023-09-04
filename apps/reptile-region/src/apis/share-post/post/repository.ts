import type { InfinitePageParam } from '<InfiniteState>';
import type {
    CreatePostRequest,
    DeletePostRequest,
    GetDetailUserPostImagesRequest,
    GetDetailUserPostsRequest,
    GetPostsRequest,
    UpdateLikeRequest,
    UpdatePostRequest,
    CreateLikeRequest,
} from '<SharePostAPI>';
import clientFetch, { METHOD } from '@/apis/clientFetch';

/** GET */
// 게시물 패치
export const getPosts = async ({ pageParam = 0 }: GetPostsRequest) => {
    const response = await clientFetch(`api/share/posts/list?pageParam=${pageParam}`);

    return response.json();
};

// 특정 유저 게시글 이미지 패치
export const getDetailUserPostImages = async ({
    pageParam = 0,
    userId,
    nickname,
}: GetDetailUserPostImagesRequest & InfinitePageParam) => {
    const queryString = userId ? `userId=${userId}` : nickname ? `nickname=${nickname}` : '';
    const response = await clientFetch(`api/share/posts/images/?pageParam=${pageParam}&${queryString}`);

    return response.json();
};

// 특정 유저 게시글 패치
export const getDetailUserPosts = async ({ pageParam = 0, userId }: GetDetailUserPostsRequest & InfinitePageParam) => {
    const response = await clientFetch(`api/share/posts/list/users/${userId}?pageParam=${pageParam}`);

    return response.json();
};

/** POST */
// 게시글 생성
export const createPost = async ({ contents, files }: CreatePostRequest) => {
    const formData = new FormData();
    formData.append('files', files);
    formData.append('contents', contents);

    const response = await clientFetch('api/share/post', {
        method: METHOD.POST,
        body: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.json();
};

// 좋아요 생성
export const createLike = async ({ postId }: CreateLikeRequest) => {
    const response = await clientFetch(`api/share/posts/${postId}/like`, {
        method: METHOD.POST,
    });

    return response.json();
};

/** PUT */
// 특정 게시글 수정
export const updatePost = async ({ postId, contents, files }: UpdatePostRequest) => {
    const formData = new FormData();
    formData.append('files', files);
    formData.append('contents', contents);

    const response = await clientFetch(`api/share/post/${postId}`, {
        method: METHOD.PUT,
        body: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
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
    const response = await clientFetch(`api/share/post/${postId}`, {
        method: METHOD.DELETE,
    });

    return response.json();
};
