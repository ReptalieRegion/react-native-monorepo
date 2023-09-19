import { ReactNode } from 'react';

type ConditionalRendererWithNullProps = {
    condition: boolean;
    children: ReactNode;
};
const ConditionalRendererWithNull = ({ condition, children }: ConditionalRendererWithNullProps) => {
    if (condition) {
        return children;
    }

    return null;
};

export default ConditionalRendererWithNull;
