import { fakerKO } from '@faker-js/faker';

import { createTagIdsAndContent } from './createTagIdsAndContent';

import type { SharePostCommentReplyData } from '<SharePostCommentReplyAPI>';
import { fakerBoolean } from '@/mocks/utils/customFaker';

type CreateCommentReplyProps = {
    commentReplyId?: string;
    commentId?: string;
    contents: string[];
    tagIds: string[];
};

const createCommentReply = (props?: CreateCommentReplyProps): SharePostCommentReplyData => {
    const commentReplyId = props?.commentId ? props.commentId : fakerKO.string.uuid();
    const { contents, tagIds } = createTagIdsAndContent();

    return {
        user: {
            id: fakerKO.string.uuid(),
            profile: {
                src: fakerKO.image.avatar(),
            },
            nickname: fakerKO.person.middleName(),
        },
        comment: {
            id: commentReplyId,
            contents,
            tagIds,
            isMine: fakerBoolean(),
            isModified: fakerBoolean(),
        },
    };
};

export default createCommentReply;
