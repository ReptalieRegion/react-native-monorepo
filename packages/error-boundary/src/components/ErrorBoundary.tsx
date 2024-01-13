import React, {
    forwardRef,
    useContext,
    useImperativeHandle,
    useRef,
    type ComponentPropsWithoutRef,
    type ComponentType,
} from 'react';

import { ErrorBoundaryGroupContext } from '../contexts/ErrorBoundaryGroupContext';
import type { ComponentPropsWithoutChildren } from '../types';

import BaseErrorBoundary from './BaseErrorBoundary';

type ErrorBoundaryProps = {
    reset(): void;
};

type RefType = ComponentPropsWithoutRef<typeof BaseErrorBoundary>;

const ErrorBoundary = forwardRef<ErrorBoundaryProps, RefType>((props, resetRef) => {
    const group = useContext(ErrorBoundaryGroupContext) ?? { resetKey: 0 };
    const resetKeys = [group.resetKey, ...(props.resetKeys || [])];

    const ref = useRef<BaseErrorBoundary>(null);
    useImperativeHandle(resetRef, () => ({
        reset: () => ref.current?.resetErrorBoundary(),
    }));

    return <BaseErrorBoundary {...props} resetKeys={resetKeys} ref={ref} />;
});

export const withErrorBoundary = <Props extends Record<string, unknown> = Record<string, never>>(
    Component: ComponentType<Props>,
    errorBoundaryProps: ComponentPropsWithoutChildren<typeof ErrorBoundary>,
) => {
    return (props: Props) => (
        <ErrorBoundary {...errorBoundaryProps}>
            <Component {...props} />
        </ErrorBoundary>
    );
};

export default ErrorBoundary;
