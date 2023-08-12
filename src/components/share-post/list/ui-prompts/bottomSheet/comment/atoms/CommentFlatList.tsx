import React from 'react';
import { ListRenderItem, StyleProp, ViewStyle } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

type CommentFlatListProps<ItemT> = {
    contentContainerStyle?: StyleProp<ViewStyle>;
    data: ArrayLike<ItemT> | null | undefined;
    renderItem: ListRenderItem<ItemT> | null | undefined;
    keyExtractor?: ((item: ItemT, index: number) => string) | undefined;
};

const CommentFlatList = <ItemT extends any>({
    contentContainerStyle,
    data,
    renderItem,
    keyExtractor,
}: CommentFlatListProps<ItemT>) => {
    return (
        <FlatList
            keyExtractor={keyExtractor}
            contentContainerStyle={contentContainerStyle}
            data={data}
            renderItem={renderItem}
        />
    );
};

export default CommentFlatList;
