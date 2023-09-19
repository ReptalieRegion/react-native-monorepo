import { useNavigation, useRoute } from '@react-navigation/native';
import { BottomSheet } from 'bottom-sheet';
import { TouchableTypo } from 'design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { SharePostNavigationProp, SharePostRouteProp } from '<SharePostRoutes>';
import useDeletePost from '@/apis/share-post/post/hooks/mutations/useDeletePost';

type ListItemProps = {
    text: string;
    onPress?: () => void;
};
const ListItem = ({ text, onPress }: ListItemProps) => {
    return (
        <View style={styles.listItem}>
            <TouchableTypo variant="body2" onPress={onPress}>
                {text}
            </TouchableTypo>
        </View>
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
