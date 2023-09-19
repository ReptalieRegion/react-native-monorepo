import { ReactNode } from 'react';

type ConditionalRendererProps = {
    condition: boolean;
    trueContent?: ReactNode;
    falseContent?: ReactNode;
};
const ConditionalRenderer = ({ condition, trueContent = null, falseContent = null }: ConditionalRendererProps) => {
    if (condition) {
        return trueContent;
    }

    return falseContent;
};

export default ConditionalRenderer;
