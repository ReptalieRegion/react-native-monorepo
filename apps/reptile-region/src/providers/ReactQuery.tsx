import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import React from 'react';

import HTTPError from '@/apis/@utils/error/HTTPError';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: (failureCount, error) => {
                if (failureCount > 2) {
                    return false;
                }

                if (error instanceof HTTPError && (error.statusCode === 401 || error.statusCode === 403)) {
                    return false;
                }

                return true;
            },
        },
    },
});

const ReactQueryProvider = ({ children }: PropsWithChildren) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
