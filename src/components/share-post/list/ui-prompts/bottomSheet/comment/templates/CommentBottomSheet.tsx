import React from 'react';

import CommentHeader from '../atoms/CommentHeader';
import CommentTextInput from '../atoms/CommentTextInput';
import CommentFlashList from '../organisms/CommentFlashList';

import { SharePostListData } from '<SharePostListAPI>';
import { UIPromptsDefaultProps } from '<UIPrompts>';
import { ConTainerStyle } from '@/components/common/ui-prompts/bottom-sheet/atoms/BottomSheetContainer';
import BottomSheet from '@/components/common/ui-prompts/bottom-sheet/molecules/BottomSheet';

export type CommentBottomSheetProps = Pick<SharePostListData, 'postId'>;

const CommentBottomSheet = ({ postId, uiPromptsClose }: CommentBottomSheetProps & UIPromptsDefaultProps) => {
    return (
        <BottomSheet
            uiPromptsClose={uiPromptsClose}
            containerProps={{ containerStyle }}
            gestureProps={{ snapInfo: { startIndex: 0, pointsFromTop: ['60%', '95%'] } }}
            headerProps={{ title: <CommentHeader /> }}
        >
            <CommentFlashList postId={postId} />
            <CommentTextInput />
        </BottomSheet>
    );
};

const containerStyle: ConTainerStyle = {
    borderRadius: 16,
};

export default CommentBottomSheet;
