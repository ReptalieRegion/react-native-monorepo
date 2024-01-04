import { isDifferentArray } from '@crawl/utils';
import type { ErrorInfo, PropsWithChildren, PropsWithRef } from 'react';
import React from 'react';

import type { IgnoreErrorType, RenderFallbackType } from '../types';

type Props<ErrorType extends Error = Error> = {
    resetKeys?: unknown[];
    onReset?(): void;
    renderFallback: RenderFallbackType;
    onError?(error: ErrorType, info: ErrorInfo): void;
    ignoreError?: IgnoreErrorType;
};

interface State<ErrorType extends Error = Error> {
    error: ErrorType | null;
}

const initialState: State = {
    error: null,
};

export default class BaseErrorBoundary extends React.Component<PropsWithRef<PropsWithChildren<Props>>, State> {
    state = initialState;
    updatedWithError = false;

    static getDerivedStateFromError(error: Error) {
        return { error };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        const { onError, ignoreError } = this.props;

        if (ignoreError?.(error)) {
            throw error;
        }

        onError?.(error, info);
    }

    resetState() {
        this.updatedWithError = false;
        this.setState(initialState);
    }

    resetErrorBoundary = () => {
        this.props.onReset?.();
        this.resetState();
    };

    componentDidUpdate(prevProps: Props) {
        const { error } = this.state;

        if (error == null) {
            return;
        }

        const { resetKeys } = this.props;

        if (!this.updatedWithError) {
            this.updatedWithError = true;
            return;
        }

        if (isDifferentArray(prevProps.resetKeys, resetKeys)) {
            this.resetErrorBoundary();
        }
    }

    render() {
        const { children, renderFallback } = this.props;
        const { error } = this.state;

        if (error != null) {
            return renderFallback({
                error,
                reset: this.resetErrorBoundary,
            });
        }

        return children;
    }
}
