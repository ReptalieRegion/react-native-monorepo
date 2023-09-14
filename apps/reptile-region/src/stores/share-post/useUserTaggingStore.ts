import { devtools } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';

type SelectionType = {
    start: number;
    end: number;
};

type UserTaggingState = {
    contentsInfo: {
        contents: string;
        selection: SelectionType | null;
    };
    taggingInfo: {
        keyword: string | undefined;
        selection: SelectionType | null;
    };
};

interface UserTaggingActions {
    setContents: (contents: string) => void;
    setContentsSelection: (selection: SelectionType) => void;
    selectTag: (contents: string) => void;
    setTaggingInfo: (selection: SelectionType) => void;
    setTaggingSelection: (selection: SelectionType) => void;
    resetTaggingInfo: () => void;
    resetUserTaggingStore: () => void;
}

const defaultUserTaggingState: UserTaggingState = {
    contentsInfo: {
        contents: '',
        selection: null,
    },
    taggingInfo: {
        keyword: undefined,
        selection: null,
    },
};

const useUserTaggingStore = createWithEqualityFn<UserTaggingState & UserTaggingActions>()(
    devtools((set, get) => ({
        ...defaultUserTaggingState,
        setContents: (contents) => {
            set((state) => ({ ...state, contentsInfo: { ...state.contentsInfo, contents } }));
        },
        setContentsSelection: (selection) => {
            set((state) => ({ ...state, contentsInfo: { ...state.contentsInfo, selection } }));
        },
        selectTag: (contents) => {
            const { taggingInfo } = get();
            if (taggingInfo.selection === null) {
                return;
            }

            set((state) => ({
                ...state,
                taggingInfo: {
                    keyword: undefined,
                    selection: null,
                },
                contentsInfo: {
                    ...state.contentsInfo,
                    contents,
                },
            }));
        },
        setTaggingSelection: (selection) => {
            set((state) => ({ ...state, selection }));
        },
        setTaggingInfo: (selection) => {
            set((state) => ({
                ...state,
                selection,
                taggingInfo: {
                    selection,
                    keyword: state.contentsInfo.contents.slice(selection.start, selection.end),
                },
            }));
        },
        resetTaggingInfo: () => {
            set((state) => ({
                ...state,
                taggingInfo: {
                    keyword: undefined,
                    selection: null,
                },
            }));
        },
        resetUserTaggingStore: () => {
            set((state) => ({
                ...state,
                ...defaultUserTaggingState,
            }));
        },
    })),
    Object.is,
);

export default useUserTaggingStore;
