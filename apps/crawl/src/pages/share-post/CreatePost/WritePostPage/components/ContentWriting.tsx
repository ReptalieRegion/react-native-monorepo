import { Typo, color } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import Title from './Title';

import { TagTextInput, useTag } from '@/pages/share-post/@common/contexts/TagTextInput';

const POST_MAX_CONTENT_LENGTH = 300;

export default function ContentsWriting() {
    const { contents } = useTag();

    return (
        <View>
            <Title title="내용 작성" />
            <View style={styles.container}>
                <View style={styles.textareaContainer}>
                    <TagTextInput
                        value={contents}
                        style={styles.textarea}
                        placeholder="일상을 공유해 주세요."
                        maxLength={POST_MAX_CONTENT_LENGTH}
                        multiline
                    />
                </View>
                <View style={styles.characterCountContainer}>
                    <Typo variant="body4" color="placeholder">{`${contents.length} / ${POST_MAX_CONTENT_LENGTH}`}</Typo>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        marginBottom: 20,
    },
    textareaContainer: {
        paddingTop: 15,
        paddingBottom: 30,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 10,
        height: 150,
        borderColor: color.Gray[250].toString(),
        backgroundColor: color.White.toString(),
    },
    textarea: {
        ...StyleSheet.absoluteFillObject,
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
        verticalAlign: 'top',
        textAlignVertical: 'top',
        overflow: 'hidden',
        height: 120,
    },
    characterCountContainer: {
        position: 'absolute',
        bottom: 10,
        right: 30,
    },
});
