import React, { useCallback, useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text, NativeSyntheticEvent, TextInputSelectionChangeEventData } from 'react-native';
import { shallow } from 'zustand/shallow';

import { color } from '@/components/common/tokens/colors';
import useSharePostWriteStore from '@/stores/share-post/write';

type Selection = TextInputSelectionChangeEventData['selection'];

const MAX_CHARACTER_COUNT = 500;

const WritingComponent = () => {
    const [tagSelections, setTagSelections] = useState<Selection[]>();
    const [currentSelection, setCurrentSelection] = useState<Selection>();

    const { contents, resetSearchInfo, setSearchInfo, setContents } = useSharePostWriteStore(
        (state) => ({
            contents: state.contents,
            setSearchInfo: state.setSearchInfo,
            resetSearchInfo: state.resetSearchInfo,
            setContents: state.setContents,
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

    const handleSelection = useCallback((event: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
        setCurrentSelection(event.nativeEvent.selection);
    }, []);

    useEffect(() => {
        const isNotExistsTag = tagSelections === undefined || tagSelections.length === 0;
        const isNotOneSelection = currentSelection === undefined || currentSelection.start !== currentSelection.end;
        if (isNotExistsTag || isNotOneSelection) {
            resetSearchInfo();
            return;
        }

        for (const selection of tagSelections) {
            const { start, end } = selection;
            if (start <= currentSelection.start && currentSelection.end <= end) {
                setSearchInfo({ start, end });
                return;
            }
        }

        resetSearchInfo();
    }, [currentSelection, tagSelections, resetSearchInfo, setSearchInfo]);

    return (
        <View style={styles.container}>
            <View style={[styles.textareaContainer]}>
                <TextInput
                    style={[styles.textarea, styles.absolute]}
                    value={contents}
                    placeholder="일상을 공유해 주세요."
                    maxLength={MAX_CHARACTER_COUNT}
                    onChangeText={handleTextChange}
                    onSelectionChange={handleSelection}
                    multiline
                />
            </View>
            <View style={styles.characterCountContainer}>
                <Text style={styles.characterCountText}>{`${contents.length} / ${MAX_CHARACTER_COUNT}`}</Text>
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
        height: 200,
        borderColor: color.Gray[250].toString(),
        backgroundColor: color.White.toString(),
    },
    textarea: {
        verticalAlign: 'top',
        overflow: 'hidden',
        height: 150,
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
