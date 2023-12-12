import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomSheet } from '@reptile-region/bottom-sheet';
import { Typo } from '@reptile-region/design-system';
import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useDeletePost from '@/apis/share-post/post/hooks/mutations/useDeletePost';
import type { RootRoutesParamList } from '@/types/routes/param-list';

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
                style: 'destructive',
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

    const bottomSheetHeight = 59 + 38 * listItem.length;

    return (
        <BottomSheet onClose={closeMenu} snapInfo={{ startIndex: 0, pointsFromTop: [bottomSheetHeight] }}>
            <View style={[styles.content, { height: bottomSheetHeight, paddingBottom: bottom }]}>
                {listItem.map(({ text, onPress }) => (
                    <TouchableOpacity style={styles.listItem} onPress={onPress}>
                        <Typo>{text}</Typo>
                    </TouchableOpacity>
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
