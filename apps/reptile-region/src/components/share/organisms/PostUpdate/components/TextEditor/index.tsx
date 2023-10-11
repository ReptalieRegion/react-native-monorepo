import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { TagTextInput, useTag, useTagHandler } from '@/components/@common/organisms/TagTextInput';

type TextEditorProps = {
    defaultValue: string;
};

export default function TextEditor({ defaultValue }: TextEditorProps) {
    const { contents } = useTag();
    const { changeText } = useTagHandler();

    useEffect(() => {
        changeText(defaultValue);
    }, [changeText, defaultValue]);

    return <TagTextInput style={styles.textInput} value={contents} multiline autoFocus scrollEnabled={false} />;
}

const styles = StyleSheet.create({
    textInput: {
        padding: 20,
    },
});
