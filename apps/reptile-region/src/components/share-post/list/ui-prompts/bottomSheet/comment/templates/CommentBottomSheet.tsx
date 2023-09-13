import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';

import CommentHeader from '../atoms/CommentHeader';
import CommentTextInput from '../atoms/CommentTextInput';
import CommentFlashList from '../organisms/CommentFlashList';

import type { BottomTabStackParamList } from '<BottomTabNavigationList>';
import { ConTainerStyle } from '@/components/common/ui-prompts/bottom-sheet/atoms/BottomSheetContainer';
import BottomSheet from '@/components/common/ui-prompts/bottom-sheet/molecules/BottomSheet';

const CommentBottomSheet = () => {
    const { params } = useRoute<RouteProp<BottomTabStackParamList, 'share-post/comment'>>();
    const navigation = useNavigation();
    const { post } = params ?? { post: { id: '' } };

    return (
        <BottomSheet
            uiPromptsClose={() => navigation.goBack()}
            containerProps={{ containerStyle }}
            gestureProps={{ snapInfo: { startIndex: 0, pointsFromTop: ['60%', '95%'] } }}
            headerProps={{ title: <CommentHeader /> }}
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
