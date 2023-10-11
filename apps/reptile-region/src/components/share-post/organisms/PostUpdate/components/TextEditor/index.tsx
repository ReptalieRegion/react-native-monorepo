import React from 'react';
import { StyleSheet } from 'react-native';

import { TagTextInput, useTag } from '@/components/@common/organisms/TagTextInput';

export default function TextEditor() {
    const { contents } = useTag();

    return <TagTextInput style={styles.textInput} value={contents} multiline autoFocus scrollEnabled={false} />;
}

const styles = StyleSheet.create({
    textInput: {
        padding: 20,
    },
});
