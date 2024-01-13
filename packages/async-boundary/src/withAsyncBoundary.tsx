import React, { type ComponentProps, type ComponentType } from 'react';

import AsyncBoundary from './AsyncBoundaryProvider';

export default function withAsyncBoundary<Props extends Record<string, unknown> = Record<string, never>>(
    Component: ComponentType<Props>,
    asyncBoundaryProps: ComponentProps<typeof AsyncBoundary>,
) {
    const Wrapped = (props: Props) => (
        <AsyncBoundary {...asyncBoundaryProps}>
            <Component {...props} />
        </AsyncBoundary>
    );

    return Wrapped;
}
