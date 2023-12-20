import { TouchableTypo } from '@crawl/design-system';
import React from 'react';

type TagProps = {
    contents: string;
    activeOpacity?: number;
};

export interface TagActions {
    onPressTag(tag: string): void;
}

export default function Tag({ contents, activeOpacity = 0.5, onPressTag }: TagProps & TagActions) {
    const handlePressTag = () => {
        if (contents.length > 0) {
            onPressTag(contents.slice(1).trim());
        }
    };

    return (
        <TouchableTypo variant="body2" color="primary" activeOpacity={activeOpacity} onPress={handlePressTag}>
            {contents + ' '}
        </TouchableTypo>
    );
}
