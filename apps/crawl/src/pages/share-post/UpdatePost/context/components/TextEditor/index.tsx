import React from 'react';
import { StyleSheet } from 'react-native';

import { TagTextInput } from '@/pages/share-post/@common/contexts/TagTextInput';

export default function TextEditor() {
    return <TagTextInput style={styles.textInput} multiline autoFocus scrollEnabled={false} maxLength={300} />;
}

const styles = StyleSheet.create({
    textInput: {
        padding: 20,
    },
});
