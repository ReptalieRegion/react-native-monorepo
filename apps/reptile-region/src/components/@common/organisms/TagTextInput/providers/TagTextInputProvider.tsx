import React, { ReactNode, useCallback, useRef } from 'react';
import { TextInput } from 'react-native';

import { TagTextInputActionsContext, TagTextInputStateContext } from '../contexts/TagTextInputContext';

export default function TagTextInputProvider({ children }: { children: ReactNode }) {
    const textInputRef = useRef<TextInput>(null);

    const focus = useCallback(() => {
        textInputRef.current?.focus();
    }, []);

    return (
        <TagTextInputActionsContext.Provider value={{ focus }}>
            <TagTextInputStateContext.Provider value={{ textInputRef }}>{children}</TagTextInputStateContext.Provider>
        </TagTextInputActionsContext.Provider>
    );
}
