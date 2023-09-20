import { TextInput } from 'react-native';

/** TextInput Ref 및 focus */
export type TagTextInputState = {
    textInputRef: React.RefObject<TextInput>;
};

export interface TagTextInputActions {
    focus(): void;
}
