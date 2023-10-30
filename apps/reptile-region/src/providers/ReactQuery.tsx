import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import React from 'react';

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
