import { BottomSheet } from '@crawl/bottom-sheet';
import { Typo } from '@crawl/design-system';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, Modal, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useDeletePost from '@/apis/share-post/post/hooks/mutations/useDeletePost';
import type { ImageType } from '@/types/global/image';
import type { SharePostListNavigationProp } from '@/types/routes/props/share-post/post-list';

type PostOptionsMenuState = {
    post: {
        id: string;
        images: ImageType[];
        contents: string;
        isMine: boolean;
        user: {
            id: string;
        };
    };
    isOpen: boolean;
};

interface PostOptionsMenuActions {
    onClose(): void;
}

export type PostOptionsMenuProps = PostOptionsMenuState & PostOptionsMenuActions;

export default function PostOptionsMenu({ isOpen, post, onClose }: PostOptionsMenuProps) {
    const navigation = useNavigation<SharePostListNavigationProp>();
    const { mutate } = useDeletePost();

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
                    onClose();
                },
            },
        ]);
    };

    const navigateUpdatePage = () => {
        onClose();
        navigation.push('share-post/post/update', {
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
        <Modal transparent={true} visible={isOpen}>
            <BottomSheet onClose={onClose} snapInfo={{ startIndex: 0, pointsFromTop: [bottomSheetHeight] }}>
                <View style={[styles.content, { height: bottomSheetHeight }]}>
                    {listItem.map(({ text, onPress }) => (
                        <TouchableOpacity key={text} style={styles.listItem} onPress={onPress}>
                            <Typo>{text}</Typo>
                        </TouchableOpacity>
                    ))}
                </View>
            </BottomSheet>
        </Modal>
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
