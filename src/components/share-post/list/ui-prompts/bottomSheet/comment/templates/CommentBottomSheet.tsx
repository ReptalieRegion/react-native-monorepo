import React from 'react';
import { Dimensions, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import CommentHeader from '../atoms/CommentHeader';
import CommentRenderItem from '../atoms/CommentRenderItem';

import { SharePostListData } from '<SharePostAPI>';
import { UIPromptsDefaultProps } from '<UIPrompts>';
import { useFetchCommentsPost } from '@/apis/share-post';
import { color } from '@/components/common/tokens/colors';
import { ConTainerStyle } from '@/components/common/ui-prompts/bottom-sheet/atoms/BottomSheetContainer';
import BottomSheet from '@/components/common/ui-prompts/bottom-sheet/molecules/BottomSheet';

export type CommentBottomSheetProps = Pick<SharePostListData, 'postId'>;

const CommentBottomSheet = ({ postId, uiPromptsClose }: CommentBottomSheetProps & UIPromptsDefaultProps) => {
    const { data } = useFetchCommentsPost(postId);

    return (
        <BottomSheet
            uiPromptsClose={uiPromptsClose}
            containerProps={{ containerStyle }}
            gestureProps={{ snapInfo: { startIndex: 0, pointsFromTop: ['60%', '95%'] } }}
            headerProps={{ title: <CommentHeader /> }}
        >
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
                <FlatList
                    contentContainerStyle={styles.commentContainer}
                    nestedScrollEnabled
                    data={data}
                    renderItem={({ item }) => (
                        <CommentRenderItem
                            id={item.id}
                            writer={item.writer}
                            contents={item.contents}
                            tags={item.tags}
                            replyCommentCount={item.replyCommentCount}
                        />
                    )}
                />
                <View>
                    <View style={styles.bottom}>
                        <Image
                            style={styles.circle}
                            source={{
                                uri: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F009%2F2022%2F06%2F08%2F0004974574_002_20220608070201911.jpg&type=a340',
                            }}
                        />
                        <TextInput placeholder="댓글을 입력하세요..." style={styles.textInput} autoFocus multiline />
                        <Text style={styles.submit}>등록</Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </BottomSheet>
    );
};

const containerStyle: ConTainerStyle = {
    borderRadius: 16,
};

const styles = StyleSheet.create({
    postContainer: {
        borderColor: color.Gray[250].toString(),
        borderBottomWidth: 1,
    },
    postImage: {
        height: 300,
        width: Dimensions.get('screen').width,
    },
    postContent: {
        padding: 10,
    },
    container: {
        height: Dimensions.get('screen').height,
        flex: 1,
        backgroundColor: color.White.toString(),
        overflow: 'hidden',
        paddingBottom: 50,
    },
    keyboard: {
        flex: 1,
    },
    commentContainer: {
        padding: 20,
        gap: 20,
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 9999,
    },
    nickname: {
        fontWeight: '500',
    },
    bottom: {
        backgroundColor: color.White.toString(),
        padding: 8,
        borderTopColor: color.Gray[250].toString(),
        borderTopWidth: 0.5,
        width: Dimensions.get('screen').width,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    textInput: {
        padding: 10,
        width: (Dimensions.get('screen').width - 30 - 20) * 0.85,
        borderColor: color.Gray[250].toString(),
        borderWidth: 0.5,
        borderRadius: 20,
        height: 30,
        maxHeight: 100,
    },
    submit: {
        color: color.Green['750'].toString(),
    },
    flex: {
        flex: 1,
    },
});

export default CommentBottomSheet;
