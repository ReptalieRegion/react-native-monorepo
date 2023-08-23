import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { PropsWithChildren } from 'react';

const queryClient = new QueryClient({
    defaultOptions: {
        mutations: {
            onError: (error) => {
                console.log(error);
            },
        },
    },
});

if (__DEV__) {
    import('react-query-native-devtools').then(({ addPlugin }) => {
        addPlugin({ queryClient });
    });
}

const ReactQueryContextComponent = ({ children }: PropsWithChildren) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryContextComponent;
