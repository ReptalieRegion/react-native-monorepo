import commentController from './modules/share-post/controller/comment';
import commentReplyController from './modules/share-post/controller/comment-reply';
import initController from './modules/share-post/controller/init';
// import postController from './modules/share-post/controller/post';
import userController from './modules/share-post/controller/user';
import staticPostController from './modules/share-post/static-controller/post';

export const handlers = [
    ...commentController(),
    ...commentReplyController(),
    ...staticPostController(),
    ...userController(),
    ...initController(),
];
