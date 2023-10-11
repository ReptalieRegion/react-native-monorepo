import React, { ReactNode } from 'react';

import TagContentProvider from './TagContentProvider';
import TagSearchProvider from './TagSearchProvider';
import TagTextInputProvider from './TagTextInputProvider';

export default function TagProvider({ children }: { children: ReactNode }) {
    return (
        <TagTextInputProvider>
            <TagSearchProvider>
                <TagContentProvider>{children}</TagContentProvider>
            </TagSearchProvider>
        </TagTextInputProvider>
    );
}
