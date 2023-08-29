import { fakerKO } from '@faker-js/faker';

import { createTagIdsAndContent } from './createTagIdsAndContent';

import type { SharePostCommentData } from '<SharePostCommentAPI>';
import { fakerBoolean } from '@/mocks/utils/customFaker';

type CreateCommentProps = {
    postId?: string;
    commentId?: string;
    contents: string[];
    tagIds: string[];
};

const createComment = (props?: CreateCommentProps): SharePostCommentData => {
    const commentId = props?.commentId ? props.commentId : fakerKO.string.uuid();
    const { contents, tagIds } = props ? { contents: props.contents, tagIds: props.tagIds } : createTagIdsAndContent();

    return {
        user: {
            id: fakerKO.string.uuid(),
            profile: {
                src: fakerKO.image.avatar(),
            },
            nickname: fakerKO.person.middleName(),
        },
        comment: {
            id: commentId,
            contents,
            tagIds,
            replyCount: fakerKO.number.int({ min: 0, max: 10 }),
            isMine: fakerBoolean(),
            isModified: fakerBoolean(),
        },
    };
};

export default createComment;
