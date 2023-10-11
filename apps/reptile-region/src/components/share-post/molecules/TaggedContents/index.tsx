import { TouchableTypo, Typo } from 'design-system';
import React, { useRef, useState } from 'react';
import type { NativeSyntheticEvent, TextLayoutEventData } from 'react-native';

import type { TagActions } from '../../atoms/Tag';
import Tag from '../../atoms/Tag';

import { ConditionalRenderer } from '@/components/@common/atoms';

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
                    const key = content + index.toString();
                    const isTag = content.startsWith('@');

                    if (isTag) {
                        return <Tag contents={content} onPressTag={onPressTag} />;
                    }

                    return (
                        <Typo key={key} variant="body2">
                            {content}
                        </Typo>
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
