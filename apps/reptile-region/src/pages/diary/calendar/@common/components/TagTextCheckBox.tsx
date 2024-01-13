import React from 'react';

import TagView, { type TagViewState } from '@/components/@common/atoms/TagView/TagView';
import useCheckBox, { type UseCheckBoxProps } from '@/hooks/useCheckBox';

type TagTextCheckBoxProps = Pick<TagViewState, 'label'> & UseCheckBoxProps;

export default function TagTextCheckBox(props: TagTextCheckBoxProps) {
    const { isChecked, onPress } = useCheckBox({
        onChangeChecked: props.onChangeChecked,
        initialChecked: props.initialChecked,
    });
    const tagStyle = tagStyleGenerator(isChecked);

    return <TagView size="large" {...props} {...tagStyle} onPress={onPress} />;
}

function tagStyleGenerator(isChecked: boolean): Pick<TagViewState, 'borderStyle' | 'color'> {
    if (isChecked) {
        return {
            borderStyle: 'solid',
            color: 'fill-primary',
        };
    }
    return {
        borderStyle: 'dashed',
        color: 'default',
    };
}
