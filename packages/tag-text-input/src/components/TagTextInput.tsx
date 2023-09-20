import React, { useContext } from 'react';
import { TextInput, TextInputProps } from 'react-native';

import { TagTextInputStateContext } from '../contexts/TagTextInputContext';

const TagTextInput = ({ ...props }: TextInputProps) => {
    const state = useContext(TagTextInputStateContext);

    return <TextInput ref={state?.textInputRef} {...props} />;
};

export default TagTextInput;
