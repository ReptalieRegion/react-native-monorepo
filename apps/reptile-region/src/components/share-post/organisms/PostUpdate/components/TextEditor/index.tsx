import React from 'react';
import { StyleSheet } from 'react-native';

import { TagTextInput, useTag } from '@/pages/share-post/@common/contexts/TagTextInput';

export default function TextEditor() {
    const { contents } = useTag();

    return <TagTextInput style={styles.textInput} value={contents} multiline autoFocus scrollEnabled={false} maxLength={300} />;
}

const styles = StyleSheet.create({
    textInput: {
        padding: 20,
    },
});
