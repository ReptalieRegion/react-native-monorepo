import React, { type ComponentType } from 'react';

export default function withPageHeaderUpdate<Props extends Record<string, unknown> = Record<string, never>>(
    Component: ComponentType<Props>,
    changeHeader: (props: Props) => null,
) {
    const Wrapped = (props: Props) => (
        <>
            <Component {...props} />
            {changeHeader(props)}
        </>
    );

    return Wrapped;
}
