import { fakerKO } from '@faker-js/faker';
import { factory, oneOf, primaryKey } from '@mswjs/data';
import { Entity } from '@mswjs/data/lib/glossary';
import { PrimaryKey } from '@mswjs/data/lib/primaryKey';
import { OneOf } from '@mswjs/data/lib/relations/Relation';

export type DBType = 'user' | 'follow' | 'sharePost' | 'shareLike' | 'shareComment' | 'shareCommentReplies' | 'image';

export type DBResult<T extends DBType> =
    | Entity<
          {
              user: {
                  _id: PrimaryKey<string>;
                  nickname: StringConstructor;
                  userId: StringConstructor;
                  password: () => string;
                  salt: () => string;
                  name: () => string;
                  phone: () => string;
                  createdAt: () => Date;
                  updatedAt: () => Date;
              };
              follow: {
                  _id: PrimaryKey<string>;
                  following: OneOf<'user'>;
                  follower: OneOf<'user'>;
                  followerNickname: StringConstructor;
                  isCanceled: () => false;
                  createdAt: () => Date;
                  updatedAt: () => Date;
              };
              sharePost: {
                  _id: PrimaryKey<string>;
                  userId: OneOf<'user'>;
                  contents: StringConstructor;
                  isDeleted: () => false;
                  createdAt: () => Date;
                  updatedAt: () => Date;
              };
              shareLike: {
                  _id: PrimaryKey<string>;
                  postId: OneOf<'sharePost'>;
                  userId: OneOf<'userId'>;
                  isCanceled: () => false;
                  createdAt: () => Date;
                  updatedAt: () => Date;
              };
              shareComment: {
                  _id: PrimaryKey<string>;
                  postId: OneOf<'sharePost'>;
                  userId: OneOf<'userId'>;
                  contents: StringConstructor;
                  replyCount: NumberConstructor;
                  isDeleted: () => false;
                  createdAt: () => Date;
                  updatedAt: () => Date;
              };
              shareCommentReplies: {
                  _id: PrimaryKey<string>;
                  commentId: OneOf<'shareComment'>;
                  userId: OneOf<'userId'>;
                  contents: StringConstructor;
                  isDeleted: () => false;
                  createdAt: () => Date;
                  updatedAt: () => Date;
              };
              image: {
                  createdAt: () => Date;
                  updatedAt: () => Date;
                  _id: PrimaryKey<string>;
                  imageKey: () => string;
                  typeId: StringConstructor;
                  type: StringConstructor;
                  isDeleted: () => false;
              };
          },
          T
      >
    | undefined;

const TIME_STAMP = {
    createdAt: () => new Date(),
    updatedAt: () => new Date(),
};

const db = factory({
    user: {
        _id: primaryKey(fakerKO.database.mongodbObjectId),
        nickname: String,
        userId: String,
        password: () => '123',
        salt: () => '123',
        name: () => fakerKO.person.fullName(),
        phone: () => fakerKO.phone.number(),
        ...TIME_STAMP,
    },
    follow: {
        _id: primaryKey(fakerKO.database.mongodbObjectId),
        following: oneOf('user'),
        follower: oneOf('user'),
        followerNickname: String,
        isCanceled: () => false,
        ...TIME_STAMP,
    },
    sharePost: {
        _id: primaryKey(fakerKO.database.mongodbObjectId),
        userId: oneOf('user'),
        contents: String,
        isDeleted: () => false,
        ...TIME_STAMP,
    },
    shareLike: {
        _id: primaryKey(fakerKO.database.mongodbObjectId),
        postId: oneOf('sharePost'),
        userId: oneOf('user'),
        isCanceled: () => false,
        ...TIME_STAMP,
    },
    shareComment: {
        _id: primaryKey(fakerKO.database.mongodbObjectId),
        postId: oneOf('sharePost'),
        userId: oneOf('user'),
        contents: String,
        replyCount: Number,
        isDeleted: () => false,
        ...TIME_STAMP,
    },
    shareCommentReplies: {
        _id: primaryKey(fakerKO.database.mongodbObjectId),
        commentId: oneOf('shareComment'),
        userId: oneOf('user'),
        contents: String,
        isDeleted: () => false,
        ...TIME_STAMP,
    },
    image: {
        _id: primaryKey(fakerKO.database.mongodbObjectId),
        imageKey: () => fakerKO.image.url(),
        typeId: String,
        type: String,
        isDeleted: () => false,
        ...TIME_STAMP,
    },
});

export default db;
