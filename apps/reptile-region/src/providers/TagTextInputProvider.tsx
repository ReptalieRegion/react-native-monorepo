import React, { ReactNode, useCallback, useState } from 'react';

import { Selection, TagState, TaggingInfo } from '<TagTextInput>';
import { INITIAL_TAG_INFO } from '@/constants/tagTextInput';
import { TagTextInputActionContext, TagTextInputStateContext } from '@/contexts/TagTextInputContext';

const setTaggingInfo = (state: TagState): TagState => {
    const currentSelection = state.contentsInfo.selection;
    const tagSelection = state.taggingInfo;
    const isNotExistsTag = tagSelection === null || tagSelection.length === 0;
    const isNotOneSelection = currentSelection === null || currentSelection.start !== currentSelection.end;
    const defaultState = {
        ...state,
        searchInfo: {
            keyword: null,
            selection: null,
        },
    };

    if (isNotExistsTag || isNotOneSelection) {
        return defaultState;
    }

    for (const { keyword, selection } of tagSelection) {
        const isTagSelection = selection.start <= currentSelection.start && currentSelection.end <= selection.end;
        if (isTagSelection) {
            return {
                ...state,
                searchInfo: {
                    keyword,
                    selection,
                },
            };
        }
    }

    return defaultState;
};

const changeContents = (state: TagState, text: string): TagState => {
    let currentOffset = 0;
    const newTagSelection = text.split(' ').reduce<TaggingInfo[]>((prev, word) => {
        if (word.startsWith('@')) {
            prev.push({
                keyword: word,
                selection: {
                    start: currentOffset + 1,
                    end: currentOffset + word.length,
                },
            });
        }

        currentOffset += word.length + 1;
        return prev;
    }, []);

    console.log(newTagSelection);

    const newSate = {
        ...state,
        taggingInfo: newTagSelection,
        contentsInfo: {
            ...state.contentsInfo,
            contents: text,
        },
    };

    return setTaggingInfo(newSate);
};

const changeSelection = (state: TagState, selection: Selection): TagState => {
    const newState = { ...state, contentsInfo: { ...state.contentsInfo, selection } };
    return setTaggingInfo(newState);
};

const onPressTag = (state: TagState, nickname: string): TagState => {
    const selection = state.searchInfo.selection;
    if (selection === null) {
        return state;
    }

    const contents = state.contentsInfo.contents;
    const newContents = contents.slice(0, selection.start) + nickname + contents.slice(selection.end, contents.length);
    return {
        ...state,
        contentsInfo: {
            ...state.contentsInfo,
            contents: newContents,
        },
        searchInfo: {
            keyword: null,
            selection: null,
        },
    };
};

const TagTextInputProvider = ({ children }: { children: ReactNode }) => {
    const [tagInfo, setTagInfo] = useState<TagState>(INITIAL_TAG_INFO);

    const handleChangeText = useCallback((text: string) => {
        setTagInfo((state) => changeContents(state, text));
    }, []);

    const handleChangeSelection = useCallback((selection: Selection) => {
        setTagInfo((state) => changeSelection(state, selection));
    }, []);

    const handleSelectTag = useCallback((nickname: string) => {
        setTagInfo((state) => onPressTag(state, nickname));
    }, []);

    return (
        <TagTextInputActionContext.Provider value={{ handleChangeText, handleChangeSelection, handleSelectTag }}>
            <TagTextInputStateContext.Provider value={tagInfo}>{children}</TagTextInputStateContext.Provider>
        </TagTextInputActionContext.Provider>
    );
};

export default TagTextInputProvider;
