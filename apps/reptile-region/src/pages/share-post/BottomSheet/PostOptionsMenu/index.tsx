import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomSheet } from 'bottom-sheet';
import { TouchableTypo } from 'design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { RootRoutesParamList } from '<routes/root>';
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

type PostOptionsMenuScreen = NativeStackScreenProps<RootRoutesParamList, 'share-post/bottom-sheet/post-options-menu'>;

export default function PostOptionsMenu({ navigation, route: { params } }: PostOptionsMenuScreen) {
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

    const navigateUpdatePage = () => {
        navigation.replace('share-post/post/update', {
            post: { contents: post.contents, id: post.id, images: post.images },
        });
    };

    return (
        <BottomSheet onClose={close} snapInfo={{ startIndex: 0, pointsFromTop: [150] }}>
            <View style={[styles.content, { paddingBottom: bottom }]}>
                {post.isMine ? (
                    <>
                        <ListItem text="삭제" onPress={deletePost} />
                        <ListItem text="수정" onPress={navigateUpdatePage} />
                    </>
                ) : (
                    <ListItem text="신고하기" />
                )}
            </View>
        </BottomSheet>
    );
}

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
