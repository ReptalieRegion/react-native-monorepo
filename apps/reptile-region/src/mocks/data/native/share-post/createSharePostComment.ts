import { fakerKO } from '@faker-js/faker';

import { SharePostCommentData } from '<SharePostCommentAPI>';
import { SharePostCommentReplyData } from '<SharePostCommentReply>';
import { Tags } from '<SharePostTags>';
import createEmptyArray from '../../../../utils/array/createEmptyArray';

type CommentType = 'reply' | 'comment';
type CommentReturnType<T extends CommentType> = T extends 'comment' ? SharePostCommentData[] : SharePostCommentReplyData[];

const createSharePostComment = <T extends CommentType>(length: number, type: T): CommentReturnType<T> => {
    const comments = createEmptyArray(length).map(() => {
        let tagsMap: Tags = {};
        const tagCount = fakerKO.number.int({ min: 0, max: 3 });
        const tags = createEmptyArray(tagCount).map(() => ({
            id: fakerKO.string.uuid(),
            nickname: '@' + fakerKO.person.middleName(),
        }));

        const contentCount = fakerKO.number.int({ min: 1, max: 6 });
        const contents = createEmptyArray(contentCount).map(() => fakerKO.lorem.sentence());

        tags.forEach((tag) => {
            const insertionPoint = fakerKO.number.int({ min: 0, max: contentCount });
            contents.splice(insertionPoint, 0, tag.nickname);
            tagsMap[tag.nickname] = { id: tag.id };
        });

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
            tags: tagsMap,
        };

        return type === 'comment'
            ? { ...baseComment, replyCommentCount: fakerKO.number.int({ min: 0, max: 20 }) }
            : baseComment;
    });
    return comments as CommentReturnType<T>;
};

export default createSharePostComment;
