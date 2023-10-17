import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

import useInfiniteUserPosts from '@/apis/share-post/post/hooks/queries/useInfiniteUserPosts';
import { ListFooterLoading } from '@/components/@common/atoms';
import SquareGrid from '@/components/@common/molecules/SquareGrid';

type SharePostDetailProps = {
    nickname: string;
    ListHeaderComponent: React.JSX.Element;
    handleImagePress: (index: number) => void;
};

const NUM_COLUMNS = 3;

export default function PostImageList({ nickname, ListHeaderComponent, handleImagePress }: SharePostDetailProps) {
    const { width } = useWindowDimensions();
    const itemWidth = width / NUM_COLUMNS - 2;

    const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteUserPosts({ nickname });
    const newData = data?.pages.flatMap((page) => page.items).map((item) => item.post.images[0]);
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
