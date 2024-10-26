import { Typo, color } from '@crawl/design-system';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import HTTPError from '@/apis/@utils/error/HTTPError';
import { Error } from '@/assets/icons';

type GlobalErrorState = {
    error: Error | HTTPError;
};

interface GlobalErrorActions {
    reset(): void;
}

type GlobalErrorProps = GlobalErrorState & GlobalErrorActions;

export default function GlobalError({ reset }: GlobalErrorProps) {
    const queryClient = useQueryClient();

    const handleReset = () => {
        queryClient.removeQueries({
            predicate: (query) => query.state.status === 'error',
            exact: true,
        });
        reset();
    };

    return (
        <View style={styles.container}>
            <Error width={50} height={50} fill={color.Red.A700.toString()} />
            <View>
                <View style={styles.textContainer}>
                    <Typo variant="heading1">알 수 없는 에러가 발생했습니다.</Typo>
                    <Typo variant="body4" textAlign="center">
                        {'새로고침을 하거나 잠시 후 다시 접속해 주시기 바랍니다.'}
                    </Typo>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleReset}>
                <Typo variant="body2" color="surface">
                    새로고침
                </Typo>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.White.toString(),
        gap: 10,
    },
    textContainer: {
        alignItems: 'center',
        gap: 5,
    },
    button: {
        backgroundColor: color.Teal[150].toString(),
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 5,
    },
});
