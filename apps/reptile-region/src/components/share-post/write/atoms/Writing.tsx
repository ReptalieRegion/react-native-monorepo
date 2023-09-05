import React, { useCallback, useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text, NativeSyntheticEvent, TextInputSelectionChangeEventData } from 'react-native';
import { shallow } from 'zustand/shallow';

import { color } from '@/components/common/tokens/colors';
import useUserTaggingStore from '@/stores/share-post/useUserTaggingStore';

type Selection = TextInputSelectionChangeEventData['selection'];

const MAX_CHARACTER_COUNT = 500;

const WritingComponent = () => {
    const [tagSelections, setTagSelections] = useState<Selection[]>();

    const { contentsInfo, setContentsSelection, setContents, setTaggingInfo, resetTaggingInfo } = useUserTaggingStore(
        (state) => ({
            contentsInfo: state.contentsInfo,
            setContentsSelection: state.setContentsSelection,
            setContents: state.setContents,
            setTaggingInfo: state.setTaggingInfo,
            resetTaggingInfo: state.resetTaggingInfo,
        }),
        shallow,
    );

    const handleTextChange = useCallback(
        (text: string) => {
            let currentOffset = 0;
            const newTagSelection = text.split(' ').reduce<Selection[]>((prev, word) => {
                if (word.startsWith('@')) {
                    prev.push({ start: currentOffset + 1, end: currentOffset + word.length });
                }

                currentOffset += word.length + 1;
                return prev;
            }, []);
            setTagSelections(newTagSelection);
            setContents(text);
        },
        [setContents],
    );

    const handleSelection = useCallback(
        (event: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
            setContentsSelection(event.nativeEvent.selection);
        },
        [setContentsSelection],
    );

    useEffect(() => {
        const currentSelection = contentsInfo.selection;
        const isNotExistsTag = tagSelections === undefined || tagSelections.length === 0;
        const isNotOneSelection = currentSelection === null || currentSelection.start !== currentSelection.end;
        if (isNotExistsTag || isNotOneSelection) {
            resetTaggingInfo();
            return;
        }

        for (const selection of tagSelections) {
            const { start, end } = selection;
            if (start <= currentSelection.start && currentSelection.end <= end) {
                setTaggingInfo(selection);
                return;
            }
        }

        resetTaggingInfo();
    }, [contentsInfo.selection, tagSelections, resetTaggingInfo, setTaggingInfo]);

    return (
        <View style={styles.container}>
            <View style={[styles.textareaContainer]}>
                <TextInput
                    value={contentsInfo.contents}
                    style={[styles.textarea, styles.absolute]}
                    placeholder="일상을 공유해 주세요."
                    maxLength={MAX_CHARACTER_COUNT}
                    onChangeText={handleTextChange}
                    onSelectionChange={handleSelection}
                    multiline
                />
            </View>
            <View style={styles.characterCountContainer}>
                <Text style={styles.characterCountText}>{`${contentsInfo.contents.length} / ${MAX_CHARACTER_COUNT}`}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        marginBottom: 20,
    },
    absolute: {
        ...StyleSheet.absoluteFillObject,
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
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
        verticalAlign: 'top',
        overflow: 'hidden',
        height: 120,
    },
    characterCountContainer: {
        position: 'absolute',
        bottom: 10,
        right: 30,
    },
    characterCountText: {
        height: 20,
        fontSize: 12,
        color: color.Gray[500].toString(),
    },
});

export default WritingComponent;
