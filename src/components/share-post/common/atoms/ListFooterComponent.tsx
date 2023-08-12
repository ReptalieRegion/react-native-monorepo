import React from 'react';
import { ActivityIndicator } from 'react-native';

const ListFooterLoading = (isFetchingNextPage: boolean) => {
    return isFetchingNextPage ? <ActivityIndicator size={'small'} /> : null;
};

export default ListFooterLoading;
