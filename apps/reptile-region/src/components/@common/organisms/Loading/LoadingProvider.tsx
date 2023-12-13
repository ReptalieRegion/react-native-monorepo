import { color } from '@crawl/design-system';
import React, { createContext, useState, type ReactNode } from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';

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
    const [isShow, setIsShow] = useState(false);

    const openLoading = () => {
        setIsShow(true);
    };

    const closeLoading = () => {
        setIsShow(false);
    };

    return (
        <LoadingContext.Provider value={{ isLoading: isShow, closeLoading, openLoading }}>
            {children}
            <Modal visible={isShow} transparent={true}>
                <View style={styles.container}>
                    <ActivityIndicator color={color.Teal[150].toString()} size={'large'} />
                </View>
            </Modal>
        </LoadingContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
