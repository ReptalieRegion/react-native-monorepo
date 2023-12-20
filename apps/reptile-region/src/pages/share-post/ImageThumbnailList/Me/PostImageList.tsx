import React, { useMemo } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LIST_HEADER_HEIGHT, LIST_HEADER_PADDING } from '../constants';
import ImageThumbnailEmptyList from '../empty-list';

import useInfiniteFetchMePostList from '@/apis/share-post/post/hooks/queries/useInfiniteFetchMePostList';
import { ListFooterLoading } from '@/components/@common/atoms';
import SquareGrid from '@/components/@common/molecules/SquareGrid';
import { BOTTOM_TAB_HEIGHT } from '@/constants/global';
import type { PageState } from '@/types/routes/@common/enum';

type PostImageListState = {
    pageState: PageState;
    ListHeaderComponent: React.JSX.Element;
};

interface PostImageListActions {
    handleImagePress: (index: number) => void;
}

type PostImageListProps = PostImageListState & PostImageListActions;

const NUM_COLUMNS = 3;

export default function PostImageList({ pageState, ListHeaderComponent, handleImagePress }: PostImageListProps) {
    const { height, width } = useWindowDimensions();
    const { bottom, top } = useSafeAreaInsets();
    const emptyListHeight = useMemo(
        () =>
            pageState === 'BOTTOM_TAB'
                ? height - BOTTOM_TAB_HEIGHT - top - LIST_HEADER_HEIGHT - LIST_HEADER_PADDING * 2
                : height - bottom - top - LIST_HEADER_HEIGHT - LIST_HEADER_PADDING * 2,
        [bottom, height, pageState, top],
    );
    const itemWidth = width / NUM_COLUMNS - 2;

    const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteFetchMePostList();
    const newData = data.map((item) => item.post.images[0]);
    const onEndReached = () => hasNextPage && !isFetchingNextPage && fetchNextPage();

    return (
        <View style={styles.container}>
            <SquareGrid
                data={newData}
                size={itemWidth}
                numColumns={NUM_COLUMNS}
                onEndReached={onEndReached}
                onPressImage={({ index }) => handleImagePress(index)}
                ListEmptyComponent={<ImageThumbnailEmptyList height={emptyListHeight} />}
                ListHeaderComponent={ListHeaderComponent}
                ListFooterComponent={<ListFooterLoading isLoading={isFetchingNextPage} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
