import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import type { PropsWithChildren } from 'react';

if (__DEV__) {
    import('react-query-native-devtools').then(({ addPlugin }) => {
        addPlugin({ queryClient });
    });
}

const queryClient = new QueryClient({
    defaultOptions: {
        mutations: {
            onError: (error) => {
                console.log(error);
            },
        },
    },
});

const ReactQueryProvider = ({ children }: PropsWithChildren) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
