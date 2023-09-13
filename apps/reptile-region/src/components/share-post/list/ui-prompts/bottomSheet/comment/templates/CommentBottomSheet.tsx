import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';

import CommentHeader from '../atoms/CommentHeader';
import CommentTextInput from '../atoms/CommentTextInput';
import CommentFlashList from '../organisms/CommentFlashList';

import type { SharePostNavigationProp, SharePostRouteProp } from '<SharePostRoutes>';
import { ConTainerStyle } from '@/components/common/ui-prompts/bottom-sheet/atoms/BottomSheetContainer';
import BottomSheet from '@/components/common/ui-prompts/bottom-sheet/molecules/BottomSheet';

const CommentBottomSheet = () => {
    const { params } = useRoute<SharePostRouteProp<'share-post/bottom-sheet/comment'>>();
    const navigation = useNavigation<SharePostNavigationProp<'share-post/bottom-sheet/comment'>>();
    const { post } = params ?? { post: { id: '' } };

    return (
        <BottomSheet
            headerProps={{ title: <CommentHeader /> }}
            containerProps={{ containerStyle }}
            uiPromptsClose={() => navigation.goBack()}
            gestureProps={{
                snapInfo: {
                    startIndex: 0,
                    pointsFromTop: ['60%', '95%'],
                },
            }}
        >
            <CommentFlashList postId={post.id} />
            <CommentTextInput />
        </BottomSheet>
    );
};

const containerStyle: ConTainerStyle = {
    borderRadius: 16,
};

export default CommentBottomSheet;
