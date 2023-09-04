import { fakerKO } from '@faker-js/faker';

import { createContents } from './createTagIdsAndContent';

import type { SharePostCommentData } from '<SharePostCommentAPI>';
import { fakerBoolean } from '@/mocks/utils/customFaker';

type CreateCommentProps = {
    postId?: string;
    commentId?: string;
    contents: string;
};

const createComment = (props?: CreateCommentProps): SharePostCommentData => {
    const commentId = props?.commentId ? props.commentId : fakerKO.string.uuid();
    const contents = props ? props.contents : createContents();

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
            replyCount: fakerKO.number.int({ min: 0, max: 10 }),
            isMine: fakerBoolean(),
            isModified: fakerBoolean(),
        },
    };
};

export default createComment;
