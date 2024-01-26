import React, { useContext, useEffect } from 'react';
import type { TextInputProps } from 'react-native';
import { TextInput } from 'react-native';

import { TagTextInputStateContext } from '../../contexts/TagTextInputContext';
import useTag from '../../hooks/useTag';
import useTagHandler from '../../hooks/useTagHandler';

export default function TagTextInput({ onChangeText, onSelectionChange, ...props }: TextInputProps) {
    const state = useContext(TagTextInputStateContext);
    const contentsInfo = useTag();
    const { changeSelection, changeText, searchTag } = useTagHandler();

    useEffect(() => {
        searchTag(contentsInfo);
    }, [contentsInfo, searchTag]);

    return (
        <TextInput
            ref={state?.textInputRef}
            value={contentsInfo.contents}
            selection={contentsInfo.selection}
            onChangeText={(text) => {
                onChangeText?.(text);
                changeText(text);
            }}
            onSelectionChange={(event) => {
                onSelectionChange?.(event);
                changeSelection(event.nativeEvent.selection);
            }}
            {...props}
        />
    );
}
