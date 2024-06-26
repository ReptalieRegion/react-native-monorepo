import { TouchableTypo, Typo } from '@crawl/design-system';
import React, { useRef, useState } from 'react';
import type { NativeSyntheticEvent, TextLayoutEventData } from 'react-native';

import { ConditionalRenderer } from '@/components/@common/atoms';
import type { TagActions } from '@/pages/share-post/@common/components/Tag';
import Tag from '@/pages/share-post/@common/components/Tag';

type TaggedContentProps = {
    uuid: string;
    contents: string;
    onPressTag: TagActions['onPressTag'];
};

export default function TaggedContents({ uuid, contents, onPressTag }: TaggedContentProps) {
    const lastItemId = useRef(uuid);
    const [isTextTooLong, setIsTextTooLong] = useState<boolean | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    if (lastItemId.current !== uuid) {
        lastItemId.current = uuid;
        setIsTextTooLong(null);
        setIsExpanded(false);
    }

    const toggleExpanded = () => {
        setIsExpanded((state) => !state);
    };

    const onTextLayout = (event: NativeSyntheticEvent<TextLayoutEventData>) => {
        if (isTextTooLong === null) {
            setIsTextTooLong(event.nativeEvent.lines.length > 2);
        }
    };

    return (
        <>
            <Typo
                textBreakStrategy="highQuality"
                lineBreakMode="clip"
                lineBreakStrategyIOS="hangul-word"
                numberOfLines={isExpanded || isTextTooLong === null ? undefined : 2}
                onTextLayout={onTextLayout}
            >
                {contents?.split(' ').map((content, index) => {
                    const isTag = content.startsWith('@');
                    const newContent = index !== contents.length ? content + ' ' : content;

                    return (
                        <ConditionalRenderer
                            key={index}
                            condition={isTag}
                            trueContent={<Tag contents={newContent} onPressTag={onPressTag} />}
                            falseContent={<Typo variant="body2">{newContent}</Typo>}
                        />
                    );
                })}
            </Typo>
            <ConditionalRenderer
                condition={isTextTooLong === null ? false : isTextTooLong}
                trueContent={
                    <TouchableTypo variant="body2" color="placeholder" onPress={toggleExpanded}>
                        {isExpanded ? '...접기' : '...더보기'}
                    </TouchableTypo>
                }
                falseContent={null}
            />
        </>
    );
}
