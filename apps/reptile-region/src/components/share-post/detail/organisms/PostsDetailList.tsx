import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import React, { useCallback, useMemo } from 'react';
import { Dimensions, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SquareImage from '../atoms/SquareImage';

import type { SharePostImagesData } from '<SharePostAPI>';
import useInfiniteUserPostImages from '@/apis/share-post/post/hooks/queries/useInfiniteUserPostImages';

type SharePostsDetailListProps = {
    userId: string;
};

const NUM_COLUMNS = 3;
const DefaultPaddingBottom = 10;
const ITEM_WIDTH = Dimensions.get('screen').width / NUM_COLUMNS - 2;

const SharePostsDetailList = ({ userId }: SharePostsDetailListProps) => {
    const { data, isLoading } = useInfiniteUserPostImages({ userId });
    const { bottom } = useSafeAreaInsets();

    const newData = useMemo(() => data?.pages.flatMap((page) => page.items), [data?.pages]);
    const renderItem = useCallback(
        ({ item }: ListRenderItemInfo<SharePostImagesData>) => <SquareImage post={item.post} width={ITEM_WIDTH} />,
        [],
    );

    if (isLoading || !data) {
        return null;
    }

    return (
        <FlashList
            contentContainerStyle={{
                paddingBottom: Platform.OS === 'ios' ? bottom + DefaultPaddingBottom : DefaultPaddingBottom,
            }}
            data={newData}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.post.thumbnail.src + index}
            numColumns={NUM_COLUMNS}
        />
    );
};

export default SharePostsDetailList;
