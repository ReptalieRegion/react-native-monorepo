import React from 'react';
import { Dimensions, FlatList } from 'react-native';
import SquareImage from '../atoms/SquareImage';
import { SharePostDetailPostsData } from '<SharePostAPI>';

type SharePostsDetailListProps = Pick<SharePostDetailPostsData, 'posts'>;

const NUM_COLUMNS = 3;
const ITEM_WIDTH = Dimensions.get('screen').width / NUM_COLUMNS;

const SharePostsDetailList = ({ posts }: SharePostsDetailListProps) => {
    return (
        <FlatList
            data={posts}
            keyExtractor={(item, index) => item.thumbnail.alt + index}
            numColumns={NUM_COLUMNS}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            renderItem={({ item }) => <SquareImage item={item} width={ITEM_WIDTH} />}
        />
    );
};

export default SharePostsDetailList;
