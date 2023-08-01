import { rest } from 'msw';
import comment from './data/share-post/comment.json';
import { fakerKO } from '@faker-js/faker';
import ENV from '@/env';

export const handlers = [
    rest.get(ENV.END_POINT_URI + 'api/posts', (_, res, ctx) => {
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

        return res(ctx.json(posts));
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
        // const { postId } = req.params as { postId: string };
        return res(ctx.json(comment));
    }),
];
