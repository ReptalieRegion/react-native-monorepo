import { SharePostsData } from '<SharePostAPI>';
import { UIPromptsDefaultProps } from '<UIPrompts>';
import BottomSheetContainer from '@/components/common/ui-prompts/bottom/atoms/BottomSheetContainer';
import BottomSheetHeader from '@/components/common/ui-prompts/bottom/atoms/BottomSheetHeader';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

type PostInfo = Pick<SharePostsData, 'postId' | 'userId'>;

interface KebabMenuBottomSheetProps {
    postInfo: PostInfo;
}

const KebabMenuBottomSheet = ({ postInfo, uiPromptsClose }: KebabMenuBottomSheetProps & UIPromptsDefaultProps) => {
    console.log(postInfo);
    return (
        <BottomSheetContainer uiPromptsClose={uiPromptsClose}>
            <BottomSheetHeader />
            <TouchableOpacity>
                <Text>신고하기</Text>
            </TouchableOpacity>
        </BottomSheetContainer>
    );
};

export default KebabMenuBottomSheet;
