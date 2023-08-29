import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import type { SharePostListData } from '<SharePostAPI>';
import type { UIPromptsDefaultProps } from '<UIPrompts>';
import BottomSheetContainer, { ConTainerStyle } from '@/components/common/ui-prompts/bottom-sheet/atoms/BottomSheetContainer';
import BottomSheetHeader from '@/components/common/ui-prompts/bottom-sheet/atoms/BottomSheetHeader';

type KebabMenuBottomSheetProps = {
    user: Pick<SharePostListData['user'], 'id'>;
    post: Pick<SharePostListData['post'], 'id'>;
};

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
