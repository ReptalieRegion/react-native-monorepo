import { color } from 'design-system';
import React, { useRef, useState } from 'react';
import { NativeSyntheticEvent, StyleSheet, Text, TextLayoutEventData } from 'react-native';

export type TagPressHandler = (content: string) => void;

type TaggedContentProps = {
    uuid: string;
    contents: string;
    onPressTag: TagPressHandler;
};

const TaggedContent = ({ uuid, contents, onPressTag }: TaggedContentProps) => {
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
                {contents?.split(' ').map((content, index) => {
                    const key = content + index.toString();
                    const isTag = content.startsWith('@');

                    if (isTag) {
                        return (
                            <Text
                                key={key}
                                onPress={() => onPressTag(content)}
                                style={styles.color}
                                suppressHighlighting={true}
                            >
                                {content + ' '}
                            </Text>
                        );
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
