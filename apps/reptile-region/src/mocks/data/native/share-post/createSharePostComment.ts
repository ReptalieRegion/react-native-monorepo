import { fakerKO } from '@faker-js/faker';

import { createTagIdsAndContent } from './utils/createTagIds';

import { SharePostCommentData } from '<SharePostCommentAPI>';
import { SharePostCommentReplyData } from '<SharePostCommentReply>';
import createEmptyArray from '@/utils/array/createEmptyArray';

type CommentType = 'reply' | 'comment';
type CommentReturnType<T extends CommentType> = T extends 'comment' ? SharePostCommentData[] : SharePostCommentReplyData[];

const createSharePostComment = <T extends CommentType>(length: number, type: T): CommentReturnType<T> => {
    const comments = createEmptyArray(length).map(() => {
        const { contents, tagIds } = createTagIdsAndContent();

        const baseComment = {
            id: fakerKO.string.uuid(),
            writer: {
                id: fakerKO.string.uuid(),
                profile: {
                    src: fakerKO.image.avatar(),
                    alt: '프로필 이미지',
                },
                nickname: fakerKO.person.middleName(),
            },
            contents,
            tags: tagIds,
        };

        return type === 'comment'
            ? { ...baseComment, replyCommentCount: fakerKO.number.int({ min: 0, max: 20 }) }
            : baseComment;
    });
    return comments as CommentReturnType<T>;
};

export default createSharePostComment;
