import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomSheet } from '@reptile-region/bottom-sheet';
import { TouchableTypo } from '@reptile-region/design-system';
import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
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

    const closeMenu = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    const deletePost = () => {
        Alert.alert('정말로 삭제 하시겠어요?', '', [
            {
                text: '취소',
                style: 'cancel',
                onPress: () => {},
            },
            {
                text: '삭제',
                onPress: () => {
                    mutate({ postId: post.id });
                    closeMenu();
                },
            },
        ]);
    };

    const navigateUpdatePage = () => {
        navigation.replace('share-post/post/update', {
            post: { contents: post.contents, id: post.id, images: post.images },
        });
    };

    const listItem = post.isMine
        ? [
              {
                  text: '삭제',
                  onPress: deletePost,
              },
              {
                  text: '수정',
                  onPress: navigateUpdatePage,
              },
          ]
        : [
              {
                  text: '신고하기',
                  onPress: () => {},
              },
          ];

    return (
        <BottomSheet onClose={closeMenu} snapInfo={{ startIndex: 0, pointsFromTop: [59 + 38 * listItem.length] }}>
            <View style={[styles.content, { paddingBottom: bottom }]}>
                {listItem.map(({ text, onPress }) => (
                    <ListItem key={text} text={text} onPress={onPress} />
                ))}
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
