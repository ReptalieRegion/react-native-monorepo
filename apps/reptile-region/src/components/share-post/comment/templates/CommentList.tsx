import { useRoute } from '@react-navigation/native';
import React from 'react';

import CommentFlashList from '../organisms/CommentFlashList';

import { SharePostCommentBottomSheetRouteProp } from '<SharePostRoutes>';

const CommentList = () => {
    const { params } = useRoute<SharePostCommentBottomSheetRouteProp<'main'>>();
    const { post } = params;

    return <CommentFlashList postId={post.id} />;
};

export default CommentList;
