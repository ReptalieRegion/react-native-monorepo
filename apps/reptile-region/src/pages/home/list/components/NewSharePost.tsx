import { Typo } from '@crawl/design-system';
import type { ListRenderItem } from '@shopify/flash-list';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import BasicImageCarousel from '@/components/@common/molecules/BasicImageCarousel/BasicImageCarousel';
import useInfiniteFetchPosts from '@/pages/share-post/PostList/ListPage/hooks/queries/useInfiniteFetchPosts';
import type { FetchPostsResponse } from '@/types/apis/share-post/post';
import type { DetailPostParams } from '@/types/routes/params/sharePost';

type NewSharePostState = {
    carouselProps: {
        gap: number;
        offset: number;
        width: number;
        height: number;
        marginHorizontal: number;
    };
};

type NewSharePostActions = {
    navigationPostDetail(params: DetailPostParams): void;
};

type NewSharePostProps = NewSharePostState & NewSharePostActions;

export default function NewSharePost({ carouselProps, navigationPostDetail }: NewSharePostProps) {
    const { data } = useInfiniteFetchPosts();

    const wrapperStyle = [
        styles.itemWrapper,
        {
            marginHorizontal: carouselProps.marginHorizontal,
            width: carouselProps.width,
        },
    ];
    const imageStyle = { width: carouselProps.width, height: carouselProps.height };

    const keyExtractor = (item: FetchPostsResponse) => item.post.id;

    const renderItem: ListRenderItem<FetchPostsResponse> = ({ item }) => {
        return (
            <TouchableOpacity style={wrapperStyle} onPress={() => navigationPostDetail({ postId: item.post.id, type: 'like' })}>
                <Image source={{ uri: item.post.images[0].src }} style={imageStyle} />
                <Typo
                    color="placeholder"
                    textBreakStrategy="highQuality"
                    lineBreakMode="clip"
                    lineBreakStrategyIOS="hangul-word"
                    numberOfLines={1}
                >
                    {item.post.contents}
                </Typo>
            </TouchableOpacity>
        );
    };

    return (
        <BasicImageCarousel
            carouselProps={carouselProps}
            listProps={{
                data: data.slice(0, 10),
                keyExtractor: keyExtractor,
                renderItem: renderItem,
                estimatedItemSize: imageStyle.width,
                estimatedListSize: imageStyle,
            }}
        />
    );
}

const styles = StyleSheet.create({
    itemWrapper: {
        gap: 15,
    },
});
