import { useNavigation, useRoute } from '@react-navigation/native';
import { BottomSheet } from 'bottom-sheet';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { SharePostNavigationProp, SharePostRouteProp } from '<SharePostRoutes>';
import useDeletePost from '@/apis/share-post/post/hooks/mutations/useDeletePost';

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

const KebabMenuBottomSheet = () => {
    const navigation = useNavigation<SharePostNavigationProp<'share-post/bottom-sheet/kebab-menu'>>();
    const { params } = useRoute<SharePostRouteProp<'share-post/bottom-sheet/kebab-menu'>>();
    const { post } = params;
    const { bottom } = useSafeAreaInsets();
    const { mutate } = useDeletePost();

    const close = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    const deletePost = () => {
        mutate({ postId: post.id });
        close();
    };

    return (
        <BottomSheet onClose={close} snapInfo={{ startIndex: 0, pointsFromTop: [100] }}>
            <View style={[styles.content, { paddingBottom: bottom }]}>
                {post.isMine ? <ListItem text="삭제" onPress={deletePost} /> : <ListItem text="신고하기" />}
            </View>
        </BottomSheet>
    );
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
