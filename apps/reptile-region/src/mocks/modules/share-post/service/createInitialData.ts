import { range } from '@crawl/utils';
import { fakerKO } from '@faker-js/faker';

import type { DBResult } from '../../../db';
import db from '../../../db';

type PrintDBInfo = {
    [key: string]:
        | DBResult<'user'>[]
        | DBResult<'follow'>[]
        | DBResult<'sharePost'>[]
        | DBResult<'shareCommentReplies'>[]
        | DBResult<'shareComment'>[]
        | DBResult<'shareLike'>[]
        | DBResult<'image'>[];
};

const printDBInfo = ({ data, timeInfo }: { data: PrintDBInfo; timeInfo: { start: Date; end: Date } }) => {
    Object.entries(data).forEach(([key, value]) => {
        console.log(`${key}: ${value.length}`);
    });
    console.log(`${timeInfo.end.getTime() - timeInfo.start.getTime()}ms`);
};

// 유니크한 데이터 만들기
const makeUniqueData = (initData: string, callback: (state: string) => any): string | undefined => {
    let index = 0;
    let uniqueData;
    while (index < 100) {
        const indexString = index !== 0 ? index.toString() : '';
        const newData = initData + indexString;
        const isExistedData = callback(newData);

        if (isExistedData === null) {
            uniqueData = newData;
            break;
        }
        index++;
    }

    return uniqueData;
};

// 랜덤 유저 추출
const findRandomUser = (users: DBResult<'user'>[]) => {
    return users[Math.floor(Math.random() * users.length)];
};

// 랜덤 댓글 추출
const findComment = (comments: DBResult<'shareComment'>[]) => {
    return comments[Math.floor(Math.random() * comments.length)];
};

// 태그가 있는 contents 만들기
const createContents = (users: DBResult<'user'>[]) => {
    const tagIdsCount = fakerKO.number.int({ min: 0, max: 3 });
    const tags = range(tagIdsCount).map(() => {
        const user = findRandomUser(users);
        if (user === undefined) {
            return {
                id: fakerKO.string.uuid(),
                nickname: `@${fakerKO.person.middleName()}`,
            };
        }

        return {
            id: user._id,
            nickname: `@${user.nickname}`,
        };
    });
    const contentCount = fakerKO.number.int({ min: 1, max: 4 });
    const contents = range(contentCount).map(() => fakerKO.lorem.sentence());

    tags.forEach((tag) => {
        const insertionPoint = fakerKO.number.int({ min: 0, max: contentCount });
        contents.splice(insertionPoint, 0, tag.nickname);
    });

    return contents.join(' ');
};

const createImage = ({ type, typeId }: { type: 'profile' | 'share'; typeId: string }, count: number = 1) => {
    return range(count).map(() => {
        return db.image.create({ imageKey: fakerKO.image.avatar(), type, typeId });
    });
};

// 유저 생성
const createUsers = (count: number = 50) => {
    return range(count).map(() => {
        const userId = fakerKO.internet.email();
        const nickname = fakerKO.person.middleName();

        const uniqueUserId = makeUniqueData(userId, (newUserId) =>
            db.user.findFirst({
                where: {
                    userId: {
                        equals: newUserId,
                    },
                },
            }),
        );

        const uniqueNickname = makeUniqueData(nickname, (newNickname) =>
            db.user.findFirst({
                where: {
                    nickname: {
                        equals: newNickname,
                    },
                },
            }),
        );

        if (!uniqueNickname || !uniqueUserId) {
            return;
        }

        const user = db.user.create({ userId: uniqueUserId, nickname: uniqueNickname });
        createImage({ type: 'profile', typeId: user._id }, 1);
        return user;
    });
};

// 팔로워 생성
export const createFollows = ({ users }: { users: DBResult<'user'>[] }, count: number = 50) => {
    const followCache = new Map<string, string[]>();

    return range(count).map(() => {
        for (let i = 0; i < 10; i++) {
            const following = findRandomUser(users);
            const follower = findRandomUser(users);

            const isNotFindUser = following === undefined || follower === undefined;
            if (isNotFindUser) {
                continue;
            }

            const isSameUser = following._id === follower._id;
            if (isSameUser) {
                continue;
            }

            const findCacheFollowing = followCache.get(following._id);
            const isExistCache =
                findCacheFollowing !== undefined && findCacheFollowing.findIndex((value) => value === follower._id) === -1;
            if (isExistCache) {
                continue;
            }

            followCache.set(following._id, findCacheFollowing ? [...findCacheFollowing, follower._id] : [follower._id]);
            return db.follow.create({
                follower,
                following,
                followerNickname: follower.nickname,
            });
        }
        return;
    });
};

// 일상공유 게시물 생성
const createSharePosts = ({ users }: { users: DBResult<'user'>[] }, count: number = 50) => {
    return range(count).map(() => {
        const user = findRandomUser(users);
        if (user === undefined) {
            return;
        }

        const contents = createContents(users);
        const post = db.sharePost.create({ userId: user, contents: contents });
        createImage({ type: 'share', typeId: post._id }, fakerKO.number.int({ min: 1, max: 5 }));
        return post;
    });
};

// 일상공유 게시물 좋아요 생성
const createShareLikes = (
    { users, posts }: { users: DBResult<'user'>[]; posts: DBResult<'sharePost'>[] },
    count: number = 10,
) => {
    return posts.flatMap((post) => {
        if (post === undefined) {
            return;
        }

        const likeUserCount = fakerKO.number.int({ min: 0, max: count });
        return range(likeUserCount).map(() => {
            const user = findRandomUser(users);
            if (user === undefined) {
                return;
            }

            return db.shareLike.create({ postId: post, userId: user });
        });
    });
};

// 댓글 생성
const createShareComments = (
    { users, posts }: { users: DBResult<'user'>[]; posts: DBResult<'sharePost'>[] },
    count: number = 30,
) => {
    return posts.flatMap((post) => {
        if (post === undefined) {
            return;
        }

        const commentCount = fakerKO.number.int({ min: 0, max: count });
        return range(commentCount).map(() => {
            const user = findRandomUser(users);
            if (user === undefined) {
                return;
            }

            const contents = createContents(users);
            return db.shareComment.create({ contents, postId: post, userId: user, replyCount: 0 });
        });
    });
};

const createShareCommentReplies = (
    {
        users,
        comments,
    }: {
        users: DBResult<'user'>[];
        comments: DBResult<'shareComment'>[];
    },
    count: number = 100,
) => {
    const commentReplies = range(count).map(() => {
        const user = findRandomUser(users);
        const comment = findComment(comments);

        if (user === undefined || comment === undefined) {
            return;
        }

        const contents = createContents(users);
        return db.shareCommentReplies.create({ userId: user, commentId: comment, contents });
    });

    return commentReplies;
};

export const initDBDate = () => {
    const start = new Date();
    const users = createUsers(50);
    const follows = createFollows({ users }, 50);
    const posts = createSharePosts({ users }, 50);
    const likes = createShareLikes({ users, posts }, 10);
    const comments = createShareComments({ users, posts }, 30);
    const commentReplies = createShareCommentReplies({ users, comments }, 100);
    const end = new Date();
    printDBInfo({
        data: {
            users,
            follows,
            posts,
            likes,
            comments,
            commentReplies,
            image: db.image.getAll(),
        },
        timeInfo: { start, end },
    });
};
