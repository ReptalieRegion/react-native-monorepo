import type { ReactNode } from 'react';

type ConditionalRendererProps = {
    condition: boolean;
    trueContent?: ReactNode;
    falseContent?: ReactNode;
};

export default function ConditionalRenderer({ condition, trueContent = null, falseContent = null }: ConditionalRendererProps) {
    if (condition) {
        return trueContent;
    }

    return falseContent;
}
