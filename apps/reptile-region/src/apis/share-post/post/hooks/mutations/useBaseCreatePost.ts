import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

import { createPost } from '../../repository';

import { SHARE_POST_ERROR_CODE } from '@/apis/@utils/error/code';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_MUTATION_KEYS } from '@/apis/@utils/query-keys';
import type { CreatePost } from '@/types/apis/share-post/post';

export default function useBaseCreatePost<Context = unknown>(
    props?: Pick<
        UseMutationOptions<CreatePost['Response'], HTTPError, CreatePost['Request'], Context>,
        'onSuccess' | 'onMutate' | 'onSettled' | 'onError'
    >,
) {
    return useMutation<CreatePost['Response'], HTTPError, CreatePost['Request'], Context>({
        mutationKey: SHARE_POST_MUTATION_KEYS.create,
        mutationFn: ({ contents, selectedPhotos }) => createPost({ contents, selectedPhotos }),
        ...props,
        onError: (error, variables, context) => {
            props?.onError?.(error, variables, context);
            if (error.code === SHARE_POST_ERROR_CODE.ACCUMULATED_REPORTS) {
                Alert.alert('누적 신고 5회로 인해 게시글 생성이 차단되었어요.', 'crawl.privacy@gmail.com으로 문의해주세요.');
            }
        },
    });
}
