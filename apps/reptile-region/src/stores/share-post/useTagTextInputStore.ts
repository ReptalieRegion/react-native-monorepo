import { devtools } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';

type SelectionType = {
    start: number;
    end: number;
};

type TaggingInfo = {
    keyword: string;
    selection: SelectionType;
};

type UserTaggingState = {
    contentsInfo: {
        contents: string;
        selection: SelectionType;
    };
    searchInfo: {
        keyword: string | null;
        selection: SelectionType | null;
    };
    taggingInfo: TaggingInfo[] | null;
    moveSelection: SelectionType | null;
    isFocus: boolean | undefined;
    _moveSelection: SelectionType | null;
};

interface UserTaggingActions {
    handleChangeText(text: string): void;
    handleChangeSelection(selection: SelectionType): void;
    handleSelectTag(nickname: string): void;
    setTextInputFocus(isFocus: boolean): void;
}

const defaultUserTaggingState: UserTaggingState = {
    contentsInfo: {
        contents: '',
        selection: {
            start: 0,
            end: 0,
        },
    },
    searchInfo: {
        keyword: null,
        selection: null,
    },
    taggingInfo: null,
    moveSelection: null,
    isFocus: undefined,
    _moveSelection: null,
} as const;

const setTaggingInfo = (state: UserTaggingState) => {
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
        const position = currentSelection.start;
        const isTagSelection = selection.start <= position && position <= selection.end;
        if (isTagSelection) {
            return {
                ...state,
                searchInfo: {
                    keyword,
                    selection: {
                        start: selection.start,
                        end: selection.end,
                    },
                },
            };
        }
    }

    return state;
};

const setMoveSelection = (state: UserTaggingState): UserTaggingState => {
    const { _moveSelection } = state;
    if (_moveSelection === null) {
        return state;
    }

    return {
        ...state,
        contentsInfo: {
            ...state.contentsInfo,
            selection: _moveSelection,
        },
        searchInfo: {
            keyword: null,
            selection: null,
        },
    };
};

const changeContents = (state: UserTaggingState, text: string): UserTaggingState => {
    let currentOffset = 0;
    const newTagSelection = text
        .split('\n')
        .flatMap((value) => value.split(' '))
        .reduce<TaggingInfo[]>((prev, word) => {
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

    const newSate = {
        ...state,
        taggingInfo: newTagSelection,
        contentsInfo: {
            ...state.contentsInfo,
            contents: text,
        },
    };

    return setMoveSelection(setTaggingInfo(newSate));
};

const changeSelection = (state: UserTaggingState, selection: SelectionType): UserTaggingState => {
    const newState = { ...state, contentsInfo: { ...state.contentsInfo, selection } };
    return setTaggingInfo(newState);
};

const onPressTag = (state: UserTaggingState, nickname: string): UserTaggingState => {
    const selection = state.searchInfo.selection;
    if (selection === null) {
        return state;
    }

    const contents = state.contentsInfo.contents;
    const prefix = contents.slice(0, selection.start);
    const suffix = contents.slice(selection.end, contents.length);
    const newNickname = suffix.startsWith(' ') ? nickname : nickname + ' ';
    const newContents = prefix + newNickname + suffix;
    const cursorPosition = selection.start + nickname.length + 1;

    return {
        ...state,
        contentsInfo: {
            ...state.contentsInfo,
            contents: newContents,
        },
        _moveSelection: {
            start: cursorPosition,
            end: cursorPosition,
        },
    };
};

const useTagTextInputStore = createWithEqualityFn<UserTaggingState & UserTaggingActions>()(
    devtools((set, get) => ({
        ...defaultUserTaggingState,
        handleChangeText(text) {
            set((state) => changeContents(state, text));
            setTimeout(() => set((state) => ({ ...state, _moveSelection: null })), 500);
        },
        handleChangeSelection(selection) {
            const { _moveSelection } = get();
            if (_moveSelection === null) {
                set((state) => changeSelection(state, selection));
            }
        },
        handleSelectTag(nickname) {
            set((state) => onPressTag(state, nickname));
        },
        setTextInputFocus(isFocus) {
            set((state) => ({ ...state, isFocus: isFocus }));
        },
    })),
    Object.is,
);

export default useTagTextInputStore;
