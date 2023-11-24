import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

import useInfiniteUserPosts from '@/apis/share-post/post/hooks/queries/useInfiniteUserPosts';
import { ListFooterLoading } from '@/components/@common/atoms';
import SquareGrid from '@/components/@common/molecules/SquareGrid';

type PostImageListState = {
    nickname: string;
    ListHeaderComponent: React.JSX.Element;
};

interface PostImageListActions {
    handleImagePress: (index: number) => void;
}

type PostImageListProps = PostImageListState & PostImageListActions;

const NUM_COLUMNS = 3;

export default function PostImageList({ nickname, ListHeaderComponent, handleImagePress }: PostImageListProps) {
    const { width } = useWindowDimensions();
    const itemWidth = width / NUM_COLUMNS - 2;

    const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteUserPosts({ nickname });
    const newData = data.map((item) => item.post.images[0]);
    const onEndReached = () => hasNextPage && !isFetchingNextPage && fetchNextPage();

    return (
        <View style={styles.container}>
            <SquareGrid
                data={newData}
                size={itemWidth}
                numColumns={NUM_COLUMNS}
                ListHeaderComponent={ListHeaderComponent}
                onEndReached={onEndReached}
                onPressImage={({ index }) => handleImagePress(index)}
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
