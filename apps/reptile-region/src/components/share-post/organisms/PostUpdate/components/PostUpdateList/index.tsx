import type { ListRenderItem } from '@shopify/flash-list';
import { FlashList } from '@shopify/flash-list';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';

import usePostUpdateHandler from '../../hooks/usePostUpdateHandler';
import usePostUpdateImages from '../../hooks/usePostUpdateImages';
import { PostUpdateImageCarousel } from '../PostUpdateImageCarousel';
import TextEditor from '../TextEditor';

import type { ImageType } from '<image>';
import { useTagHandler } from '@/components/@common/organisms/TagTextInput';
import useFlashListScroll from '@/hooks/useFlashListScroll';

export enum MessageType {
    Contents,
    Images,
}

interface TextMessage {
    text: string;
    type: MessageType.Contents;
}

interface ImageMessage {
    images: ImageType[];
    type: MessageType.Images;
}

export type Message = ImageMessage | TextMessage;

type PostUpdateListState = {
    images: ImageType[];
    contents: string;
};

type PostUpdateListProps = PostUpdateListState;

export default function PostUpdateList(props: PostUpdateListProps) {
    const { flashListRef, scrollIntoView } = useFlashListScroll<Message>();
    const { registerImage } = usePostUpdateHandler();
    const { changeText } = useTagHandler();
    const { images } = usePostUpdateImages();

    const data: Message[] = [
        { images, type: MessageType.Images },
        { text: props.contents, type: MessageType.Contents },
    ];

    useEffect(() => {
        changeText(props.contents);
        registerImage(props.images);
    }, [props, registerImage, changeText]);

    const { height } = useAnimatedKeyboard();
    const animatedStyle = useAnimatedStyle(() => ({
        paddingBottom: height.value,
    }));

    const renderItem: ListRenderItem<Message> = (info) => {
        switch (info.item.type) {
            case MessageType.Contents:
                return <TextEditor />;
            case MessageType.Images:
                return <PostUpdateImageCarousel />;
            default:
                return null;
        }
    };

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            <FlashList
                ref={flashListRef}
                data={data}
                renderItem={renderItem}
                getItemType={(item) => item.type}
                estimatedItemSize={100}
                onContentSizeChange={(_, h) => scrollIntoView({ offset: h })}
                keyboardShouldPersistTaps={'always'}
            />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
