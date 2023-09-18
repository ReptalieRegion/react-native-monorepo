declare module '<TagTextInput>' {
    import { TextInputSelectionChangeEventData } from 'react-native';

    type Selection = TextInputSelectionChangeEventData['selection'];
    type TaggingInfo = {
        keyword: string;
        selection: Selection;
    };

    type TagState = {
        contentsInfo: {
            contents: string;
            selection: Selection;
        };
        taggingInfo: TaggingInfo[] | null;
        searchInfo: {
            keyword: string | null;
            selection: Selection | null;
        };
        moveSelection: Selection | null;
    };

    interface TagActions {
        handleChangeText: (text) => void;
        handleChangeSelection: (selection: Selection) => void;
        handleSelectTag: (nickname: string) => void;
    }
}
