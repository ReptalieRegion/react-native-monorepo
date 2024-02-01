import { type ReactNode } from 'react';

type ConditionRenderProps = {
    condition: boolean;
    trueContent?: ReactNode;
    falseContent?: ReactNode;
};

export default function ConditionRender({ condition, trueContent, falseContent }: ConditionRenderProps) {
    if (condition) {
        return trueContent;
    }

    return falseContent;
}
