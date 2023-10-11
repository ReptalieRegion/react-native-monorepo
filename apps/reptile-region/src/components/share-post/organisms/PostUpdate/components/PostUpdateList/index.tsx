import { FlashList, ListRenderItem } from '@shopify/flash-list';
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';

import useEffectChangeHeaderRight from '../../hooks/useEffectChangeHeaderRight';
import PostUpdateImageCarousel from '../PostUpdateImageCarousel';
import TextEditor from '../TextEditor';

import type { ImageType } from '<image>';
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
    data: Message[];
};

interface PostUpdateListActions {
    onSubmit(props: { contents: string }): void;
    onChangeHeaderRight(headerRight: () => React.JSX.Element): void;
    onDeleteImage(src: string): void;
}

type PostUpdateListProps = PostUpdateListState & PostUpdateListActions;

export default function PostUpdateList({ data, onChangeHeaderRight, onSubmit, onDeleteImage }: PostUpdateListProps) {
    useEffectChangeHeaderRight({ onChangeHeaderRight, onSubmit });

    const { flashListRef, scrollIntoView } = useFlashListScroll<Message>();

    const { height } = useAnimatedKeyboard();
    const animatedStyle = useAnimatedStyle(() => ({
        paddingBottom: height.value,
    }));

    const renderItem: ListRenderItem<Message> = (info) => {
        switch (info.item.type) {
            case MessageType.Contents:
                return <TextEditor defaultValue={info.item.text} />;
            case MessageType.Images:
                return <PostUpdateImageCarousel images={info.item.images} onDeleteImage={onDeleteImage} />;
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
