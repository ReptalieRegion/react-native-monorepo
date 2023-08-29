import commentController from './modules/share-post/controller/comment';
import commentReplyController from './modules/share-post/controller/comment-reply';
import postController from './modules/share-post/controller/post';
import userController from './modules/share-post/controller/user';

export const handlers = [...commentController(), ...commentReplyController(), ...postController(), ...userController()];
