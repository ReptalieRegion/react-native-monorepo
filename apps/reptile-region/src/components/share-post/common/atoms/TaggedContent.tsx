import React, { useRef, useState } from 'react';
import { GestureResponderEvent, NativeSyntheticEvent, StyleSheet, Text, TextLayoutEventData } from 'react-native';

import { TagIds, TagValue } from '<SharePostTagIds>';
import { color } from '@/components/common/tokens/colors';

export type TagPressHandler = (event: GestureResponderEvent, content: string, tagId: string) => void;

type TaggedContentProps = {
    uuid: string;
    tags: TagIds;
    contents: string[];
    onPressTag?: TagPressHandler;
};

type TagProps = {
    content: string;
    tag: TagValue;
} & Pick<TaggedContentProps, 'onPressTag'>;

const Tag = ({ content, tag, onPressTag }: TagProps) => {
    return (
        <Text style={styles.color} onPress={(event) => onPressTag?.(event, content, tag.id)} suppressHighlighting={true}>
            {content + ' '}
        </Text>
    );
};

const TaggedContent = ({ uuid, tags, contents, onPressTag }: TaggedContentProps) => {
    const lastItemId = useRef(uuid);
    const [isTextTooLong, setIsTextTooLong] = useState<boolean | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    if (lastItemId.current !== uuid) {
        lastItemId.current = uuid;
        setIsTextTooLong(null);
        setIsExpanded(false);
    }

    const onTextLayout = (event: NativeSyntheticEvent<TextLayoutEventData>) => {
        if (isTextTooLong === null) {
            console.log(event.nativeEvent.lines.length > 2);
            setIsTextTooLong(event.nativeEvent.lines.length > 2);
        }
    };

    return (
        <>
            <Text
                textBreakStrategy="highQuality"
                lineBreakMode="clip"
                lineBreakStrategyIOS="hangul-word"
                numberOfLines={isExpanded || isTextTooLong === null ? undefined : 2}
                onTextLayout={onTextLayout}
            >
                {contents.map((content, index) => {
                    const key = content + index.toString();
                    const tag = tags[content];
                    const isTag = content.startsWith('@') && tag !== undefined;

                    if (isTag) {
                        return <Tag key={key} content={content} tag={tag} onPressTag={onPressTag} />;
                    }

                    return <Text key={key}>{content}</Text>;
                })}
            </Text>
            {isTextTooLong ? (
                <Text style={styles.accordionMenu} suppressHighlighting={true} onPress={() => setIsExpanded((state) => !state)}>
                    {isExpanded ? '...접기' : '...더보기'}
                </Text>
            ) : null}
        </>
    );
};

const styles = StyleSheet.create({
    color: {
        color: color.Green[750].toString(),
        fontWeight: '500',
        textAlignVertical: 'bottom',
    },
    accordionMenu: {
        color: color.Gray[500].toString(),
    },
});

export default TaggedContent;
