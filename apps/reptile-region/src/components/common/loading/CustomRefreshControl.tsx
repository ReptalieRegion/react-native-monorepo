import React, { ForwardedRef, forwardRef, useState } from 'react';
import { RefreshControl, RefreshControlProps } from 'react-native';

type CustomRefreshControlProps = {
    asyncOnRefresh: () => Promise<void>;
};

const CustomRefreshControl = (
    { asyncOnRefresh }: CustomRefreshControlProps,
    ref: ForwardedRef<RefreshControl>,
): React.ReactElement<RefreshControlProps> => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await asyncOnRefresh();
        setRefreshing(false);
    };

    return <RefreshControl ref={ref} refreshing={refreshing} onRefresh={onRefresh} />;
};

export default forwardRef(CustomRefreshControl);
