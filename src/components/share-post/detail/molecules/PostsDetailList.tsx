import React from 'react';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SquareImage from '../atoms/SquareImage';

import { SharePostDetailPostsData } from '<SharePostAPI>';

type SharePostsDetailListProps = Pick<SharePostDetailPostsData, 'posts'>;

const NUM_COLUMNS = 3;
const ITEM_WIDTH = Dimensions.get('screen').width / NUM_COLUMNS - 2;

const SharePostsDetailList = ({ posts }: SharePostsDetailListProps) => {
    const { bottom } = useSafeAreaInsets();
    const paddingBottom = Platform.OS === 'ios' ? bottom + 10 : 10;

    return (
        <FlatList
            contentContainerStyle={[styles.contentContainer, { paddingBottom }]}
            data={posts}
            keyExtractor={(item, index) => item.thumbnail.alt + index}
            numColumns={NUM_COLUMNS}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            renderItem={({ item }) => <SquareImage item={item} width={ITEM_WIDTH} />}
        />
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        paddingBottom: 16,
    },
});

export default SharePostsDetailList;
