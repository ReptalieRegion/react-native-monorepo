import { fakerKO } from '@faker-js/faker';

import { createContents } from './createTagIdsAndContent';

import { fakerBoolean } from '@/mocks/utils/customFaker';
import type { FetchCommentReplyResponse } from '@/types/apis/share-post/comment-reply';

export type CreateCommentReplyProps = {
    commentReplyId?: string;
    commentId?: string;
    contents: string;
};

const createCommentReply = (props?: CreateCommentReplyProps): FetchCommentReplyResponse => {
    const commentReplyId = props?.commentId ? props.commentId : fakerKO.string.uuid();
    const contents = createContents();

    return {
        commentReply: {
            id: commentReplyId,
            contents,
            isMine: fakerBoolean(),
            isModified: fakerBoolean(),
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

export default createCommentReply;
