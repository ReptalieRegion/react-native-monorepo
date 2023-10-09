import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { Typo } from 'design-system';
import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';

import ChangeHeaderSubmitButton from './components/ChangeHeaderRight';
import type { ChangeHeaderSubmitButtonProps } from './components/ChangeHeaderRight';
import TextEditor from './components/TextEditor';
import PostUpdate from './providers/PostUpdate';

import type { ImageType } from '<image>';
import type { RootRoutesParamList } from '<routes/root>';
import ImageCarousel from '@/components/@common/organisms/ImageCarousel/providers/ImageCarousel';
import useFlashListScroll from '@/hooks/useFlashListScroll';

enum MessageType {
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

type Message = ImageMessage | TextMessage;

type ExtraData = {
    width: number;
};

type SharePostUpdateScreen = NativeStackScreenProps<RootRoutesParamList, 'share-post/post/update'>;

export default function SharePostUpdate({
    navigation,
    route: {
        params: { post },
    },
}: SharePostUpdateScreen) {
    const newData: Message[] = [
        { images: post.images, type: MessageType.Images },
        { text: post.contents, type: MessageType.Contents },
    ];

    const dimensions = useWindowDimensions();
    const extraData: ExtraData = { width: dimensions.width };

    const { flashListRef, scrollIntoView } = useFlashListScroll<Message>();

    const { height } = useAnimatedKeyboard();
    const animatedStyle = useAnimatedStyle(() => ({
        paddingBottom: height.value,
    }));

    const renderItem: ListRenderItem<Message> = (info) => {
        const { width } = info.extraData as ExtraData;

        switch (info.item.type) {
            case MessageType.Contents:
                return <TextEditor defaultValue={info.item.text} />;
            case MessageType.Images:
                return (
                    <ImageCarousel>
                        <ImageCarousel.List
                            images={info.item.images}
                            height={300}
                            width={width}
                            keyboardShouldPersistTaps={'always'}
                            ImageItemOverlay={<Typo>hi</Typo>}
                        />
                        <View style={styles.imageCarouselIndicatorContainer}>
                            <ImageCarousel.Indicators imageCount={info.item.images.length} />
                        </View>
                    </ImageCarousel>
                );
            default:
                return null;
        }
    };

    const handleChangeHeaderRight: ChangeHeaderSubmitButtonProps['onChangeHeaderRight'] = (headerRight) => {
        navigation.setOptions({ headerRight });
    };

    return (
        <PostUpdate>
            <ChangeHeaderSubmitButton postId={post.id} onChangeHeaderRight={handleChangeHeaderRight} />
            <Animated.View style={[styles.container, animatedStyle]}>
                <FlashList
                    ref={flashListRef}
                    data={newData}
                    extraData={extraData}
                    renderItem={renderItem}
                    getItemType={(item) => item.type}
                    estimatedItemSize={100}
                    onContentSizeChange={(_, h) => scrollIntoView({ offset: h })}
                    keyboardShouldPersistTaps={'always'}
                />
            </Animated.View>
        </PostUpdate>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageCarouselIndicatorContainer: {
        alignItems: 'center',
        padding: 10,
    },
});
