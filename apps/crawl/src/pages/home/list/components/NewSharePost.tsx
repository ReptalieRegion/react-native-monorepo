import { Typo } from '@crawl/design-system';
import type { ListRenderItem } from '@shopify/flash-list';
import { Image } from 'expo-image';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useHomeListNavigation from '../hooks/useHomeListNavigation';

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
    const imageStyle = { width: carouselProps.width, height: data.length !== 0 ? carouselProps.height : 0 };
    const keyExtractor = (item: FetchPostsResponse) => item.post.id;

    const renderItem: ListRenderItem<FetchPostsResponse> = ({ item }) => {
        const uri = item.post.images[0].src;

        const handlePressImage = () => {
            navigationPostDetail({ postId: item.post.id, type: 'like' });
        };

        return (
            <TouchableOpacity style={wrapperStyle} onPress={handlePressImage}>
                <Image source={{ uri }} recyclingKey={uri} style={imageStyle} />
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
                data,
                keyExtractor,
                renderItem,
                ListEmptyComponent: <Empty />,
                estimatedItemSize: imageStyle.width,
            }}
        />
    );
}

function Empty() {
    const { navigateSharePost } = useHomeListNavigation();

    return (
        <View>
            <TouchableOpacity style={emptyStyles.wrapper} onPress={navigateSharePost}>
                <Typo variant="body2" color="placeholder">
                    아직 게시물이 없어요
                </Typo>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    itemWrapper: {
        gap: 15,
    },
});

const emptyStyles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('screen').width,
        height: 80,
    },
});
