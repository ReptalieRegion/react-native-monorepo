import React from 'react';
import { GestureResponderEvent, StyleSheet, Text } from 'react-native';

import { Tags } from '<SharePostTags>';
import { color } from '@/components/common/tokens/colors';

interface TaggedContentProps {
    onPressTag?: (event: GestureResponderEvent, content: string, tagId: string) => void;
    tags: Tags;
    contents: string[];
}

const TaggedContent = ({ tags, contents, onPressTag }: TaggedContentProps) => {
    return (
        <>
            {contents.map((content, index) => {
                const tag = tags[content];
                const isTag = content.startsWith('@') && tag !== undefined;
                return isTag ? (
                    <Text
                        key={content + index}
                        style={tagStyles.color}
                        onPress={(event) => onPressTag?.(event, content, tag.id)}
                        suppressHighlighting={true}
                    >
                        {content + ' '}
                    </Text>
                ) : (
                    <Text key={content + index}>{content}</Text>
                );
            })}
        </>
    );
};

const tagStyles = StyleSheet.create({
    color: {
        color: color.Green['750'].toString(),
        fontWeight: '500',
        textAlignVertical: 'bottom',
    },
});

export default TaggedContent;
