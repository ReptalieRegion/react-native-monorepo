import React, { ReactNode } from 'react';

import TagContentProvider from './TagContentProvider';
import TagSearchProvider from './TagSearchProvider';
import TagTextInputProvider from './TagTextInputProvider';

const TagProvider = ({ children }: { children: ReactNode }) => {
    return (
        <TagTextInputProvider>
            <TagSearchProvider>
                <TagContentProvider>{children}</TagContentProvider>
            </TagSearchProvider>
        </TagTextInputProvider>
    );
};

export default TagProvider;
