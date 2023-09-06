import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { SharePostListData } from '<SharePostAPI>';
import type { UIPromptsDefaultProps } from '<UIPrompts>';
import useDeletePost from '@/apis/share-post/post/hooks/mutations/useDeletePost';
import BottomSheetContainer, { ConTainerStyle } from '@/components/common/ui-prompts/bottom-sheet/atoms/BottomSheetContainer';
import BottomSheetHeader from '@/components/common/ui-prompts/bottom-sheet/atoms/BottomSheetHeader';

type KebabMenuBottomSheetProps = {
    user: Pick<SharePostListData['user'], 'id'>;
    post: Pick<SharePostListData['post'], 'id' | 'isMine'>;
};

type ListItemProps = {
    text: string;
    onPress?: () => void;
};
const ListItem = ({ text, onPress }: ListItemProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.listItem}>
            <Text>{text}</Text>
        </TouchableOpacity>
    );
};

const KebabMenuBottomSheet = ({ uiPromptsClose, post, user }: KebabMenuBottomSheetProps & UIPromptsDefaultProps) => {
    const { bottom } = useSafeAreaInsets();
    const { mutate } = useDeletePost({ postId: post.id, userId: user.id });

    return (
        <BottomSheetContainer uiPromptsClose={uiPromptsClose} containerStyle={containerStyle}>
            <BottomSheetHeader />
            <View style={[styles.content, { paddingBottom: bottom }]}>
                {post.isMine ? (
                    <ListItem
                        text="삭제"
                        onPress={() => {
                            mutate();
                            uiPromptsClose();
                        }}
                    />
                ) : (
                    <ListItem text="신고하기" />
                )}
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
    listItem: {
        paddingTop: 10,
        paddingBottom: 10,
    },
});

export default KebabMenuBottomSheet;
