import { useBottomSheet } from '@crawl/bottom-sheet';
import { Typo } from '@crawl/design-system';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useReportListBottomSheet from '../ReportList/useReportListBottomSheet';

import useDeletePost from '@/apis/share-post/post/hooks/mutations/useDeletePost';
import { ReportType } from '@/types/apis/report';
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
};

interface PostOptionsMenuActions {}

export type PostOptionsMenuProps = PostOptionsMenuState & PostOptionsMenuActions;

export default function PostOptionsMenu({ post }: PostOptionsMenuProps) {
    const navigation = useNavigation<SharePostListNavigationProp>();
    const openReportListBottomSheet = useReportListBottomSheet();
    const { bottomSheetClose } = useBottomSheet();
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
                    bottomSheetClose();
                },
            },
        ]);
    };

    const navigateUpdatePage = async () => {
        await bottomSheetClose();
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
                  onPress: async () => {
                      await bottomSheetClose();
                      openReportListBottomSheet({
                          report: { type: ReportType.POST, typeId: post.id, reported: post.user.id },
                      });
                  },
              },
          ];

    const bottomSheetHeight = 59 + 38 * listItem.length;

    return (
        <View style={[styles.content, { height: bottomSheetHeight }]}>
            {listItem.map(({ text, onPress }) => (
                <TouchableOpacity key={text} style={styles.listItem} onPress={onPress}>
                    <Typo>{text}</Typo>
                </TouchableOpacity>
            ))}
        </View>
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
