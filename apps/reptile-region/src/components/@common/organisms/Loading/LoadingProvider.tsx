import { color } from '@crawl/design-system';
import React, { createContext, useState, type ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, View, useWindowDimensions } from 'react-native';

import { ConditionalRenderer } from '../../atoms';

type LoadingProviderState = {
    children: ReactNode;
};

type LoadingProviderProps = LoadingProviderState;

type LoadingContextActions = {
    isLoading: boolean;
    openLoading(): void;
    closeLoading(): void;
};

export const LoadingContext = createContext<LoadingContextActions | null>(null);

export default function GlobalLoading({ children }: LoadingProviderProps) {
    const { width, height } = useWindowDimensions();
    const [isShow, setIsShow] = useState(false);

    const openLoading = () => {
        setIsShow(true);
    };

    const closeLoading = () => {
        setIsShow(false);
    };

    console.log(isShow);

    return (
        <LoadingContext.Provider value={{ isLoading: isShow, closeLoading, openLoading }}>
            {children}
            <ConditionalRenderer
                condition={isShow}
                trueContent={
                    <View style={[styles.container, { width, height }]}>
                        <ActivityIndicator color={color.Teal[150].toString()} size={'large'} />
                    </View>
                }
            />
        </LoadingContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
