import { fakerKO } from '@faker-js/faker';
import { rest } from 'msw';

import { SharePostCommentData, Tags } from '<SharePostAPI>';
import ENV from '@/env';

export const handlers = [
    rest.get(ENV.END_POINT_URI + 'api/posts', (req, res, ctx) => {
        const pageParam = req.url.searchParams.get('pageParam');

        const posts = Array(10)
            .fill('')
            .map(() => {
                return {
                    nickname: fakerKO.person.middleName(),
                    userId: fakerKO.string.uuid(),
                    postId: fakerKO.string.uuid(),
                    profile: {
                        src: fakerKO.image.avatar(),
                        alt: '프로필 이미지',
                    },
                    name: fakerKO.person.fullName(),
                    isLike: Math.random() >= 0.5,
                    isFollow: Math.random() >= 0.5,
                    content: fakerKO.lorem.paragraphs(1),
                    images: Array(Math.floor(Math.random() * 4 + 1))
                        .fill('')
                        .map(() => ({
                            src: fakerKO.image.url(),
                            alt: '게시물 이미지',
                        })),
                    likeCount: fakerKO.number.int({ min: 0, max: 200 }),
                    commentCount: fakerKO.number.int({ min: 0, max: 200 }),
                };
            });

        return res(
            ctx.json({
                postList: posts,
                nextPage: Number(pageParam) + 1,
            }),
        );
    }),
    rest.get(ENV.END_POINT_URI + 'api/posts/:userId', (_, res, ctx) => {
        const userPosts = {
            nickname: fakerKO.person.middleName(),
            name: fakerKO.person.fullName(),
            followerCount: fakerKO.number.int({ min: 0, max: 200 }),
            followingCount: fakerKO.number.int({ min: 0, max: 200 }),
            isFollow: Math.random() >= 0.5,
            profile: {
                src: fakerKO.image.url(),
                alt: '프로필 사진',
            },
            posts: Array(Math.floor(Math.random() * 20 + 1))
                .fill('')
                .map(() => ({
                    postId: fakerKO.string.uuid(),
                    thumbnail: {
                        src: fakerKO.image.url(),
                        alt: '포스터',
                    },
                })),
        };
        return res(ctx.json(userPosts));
    }),
    rest.get(ENV.END_POINT_URI + 'api/posts/:postId/comment', (req, res, ctx) => {
        const comments: SharePostCommentData[] = Array(fakerKO.number.int({ min: 1, max: 20 }))
            .fill('')
            .map(() => {
                let tagsMap: Tags = {};
                const numberOfTags = fakerKO.number.int({ min: 0, max: 3 });
                const tags = Array(numberOfTags)
                    .fill('')
                    .map(() => ({ id: fakerKO.string.uuid(), nickname: '@' + fakerKO.person.middleName() }));

                const contents = Array(10)
                    .fill('')
                    .map(() => fakerKO.lorem.sentence());

                tags.forEach((tag) => {
                    const insertionPoint = fakerKO.number.int({ min: 0, max: contents.length });
                    contents.splice(insertionPoint, 0, tag.nickname);
                    tagsMap[tag.nickname] = {
                        id: tag.id,
                    };
                });

                return {
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
                    replyCommentCount: fakerKO.number.int({ min: 0, max: 20 }),
                };
            });

        return res(ctx.json(comments));
    }),
];
