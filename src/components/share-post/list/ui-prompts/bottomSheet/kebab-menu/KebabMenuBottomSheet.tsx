import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { SharePostsData } from '<SharePostAPI>';
import { UIPromptsDefaultProps } from '<UIPrompts>';
import BottomSheetContainer, { ConTainerStyle } from '@/components/common/ui-prompts/bottom-sheet/atoms/BottomSheetContainer';
import BottomSheetHeader from '@/components/common/ui-prompts/bottom-sheet/atoms/BottomSheetHeader';

type PostInfo = Pick<SharePostsData, 'postId' | 'userId'>;

interface KebabMenuBottomSheetProps {
    postInfo: PostInfo;
}

const KebabMenuBottomSheet = ({ uiPromptsClose }: KebabMenuBottomSheetProps & UIPromptsDefaultProps) => {
    return (
        <BottomSheetContainer uiPromptsClose={uiPromptsClose} containerStyle={containerStyle}>
            <BottomSheetHeader />
            <View style={styles.content}>
                <TouchableOpacity>
                    <Text>신고하기</Text>
                </TouchableOpacity>
            </View>
        </BottomSheetContainer>
    );
};

const containerStyle: ConTainerStyle = {
    borderRadius: 16,
};

const styles = StyleSheet.create({
    content: {
        paddingTop: 5,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
    },
});

export default KebabMenuBottomSheet;
