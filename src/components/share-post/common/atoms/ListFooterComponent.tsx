import React from 'react';
import { ActivityIndicator } from 'react-native';

type ListFooterLoadingProps = {
    isLoading: boolean;
};

const ListFooterLoading = ({ isLoading }: ListFooterLoadingProps) => {
    return isLoading ? <ActivityIndicator size={'small'} /> : null;
};

export default ListFooterLoading;
