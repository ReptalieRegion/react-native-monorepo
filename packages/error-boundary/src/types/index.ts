import type { ComponentProps, ComponentRef, ErrorInfo, JSXElementConstructor, ReactNode } from 'react';

import type { ErrorBoundary } from '..';

export type ComponentPropsWithoutChildren<Component extends keyof React.JSX.IntrinsicElements | JSXElementConstructor<any>> =
    Omit<ComponentProps<Component>, 'children'>;

type RenderFallbackProps<ErrorType extends Error = Error> = {
    error: ErrorType;
    reset: () => void;
};

export type RenderFallbackType = <ErrorType extends Error>(props: RenderFallbackProps<ErrorType>) => ReactNode;
export type OnError = <ErrorType extends Error = Error>(error: ErrorType, info: ErrorInfo) => void;
export type IgnoreErrorType = <ErrorType extends Error = Error>(error: ErrorType) => boolean;

export type ErrorBoundaryGroup = {
    reset(): void;
    resetKey: number;
};

export type ErrorBoundaryRef = ComponentRef<typeof ErrorBoundary>;
