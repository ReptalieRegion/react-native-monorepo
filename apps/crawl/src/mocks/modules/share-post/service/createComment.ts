import { fakerKO } from '@faker-js/faker';

import { createContents } from './createTagIdsAndContent';

import { fakerBoolean, fakerCreatedAt } from '@/mocks/utils/customFaker';
import type { FetchCommentResponse } from '@/types/apis/share-post/comment';

export type CreateCommentProps = {
    postId?: string;
    commentId?: string;
    contents: string;
};

const createComment = (props?: CreateCommentProps): FetchCommentResponse => {
    const commentId = props?.commentId ? props.commentId : fakerKO.string.uuid();
    const contents = props ? props.contents : createContents();

    return {
        comment: {
            id: commentId,
            contents,
            replyCount: fakerKO.number.int({ min: 0, max: 10 }),
            isMine: fakerBoolean(),
            isModified: fakerBoolean(),
            createdAt: fakerCreatedAt(),
            user: {
                id: fakerKO.string.uuid(),
                profile: {
                    src: fakerKO.image.avatar(),
                },
                nickname: fakerKO.person.middleName(),
            },
        },
    };
};

export default createComment;
