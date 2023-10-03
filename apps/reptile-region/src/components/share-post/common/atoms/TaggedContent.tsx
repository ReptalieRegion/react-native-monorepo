import { Typo } from 'design-system';
import { TouchableTypo } from 'design-system';
import React, { useRef, useState } from 'react';
import { NativeSyntheticEvent, TextLayoutEventData } from 'react-native';

import ConditionalRenderer from '@/components/common/element/ConditionalRenderer';

type TaggedContentProps = {
    uuid: string;
    contents: string;
    onPressTag?: (tag: string) => void;
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
                        return (
                            <TouchableTypo
                                key={key}
                                variant="body2"
                                color="primary"
                                activeOpacity={0}
                                onPress={() => {
                                    if (onPressTag) {
                                        onPressTag(content.slice(1));
                                    }
                                }}
                            >
                                {content + ' '}
                            </TouchableTypo>
                        );
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
                    <TouchableTypo variant="body2" color="placeholder" onPress={() => setIsExpanded((state) => !state)}>
                        {isExpanded ? '...접기' : '...더보기'}
                    </TouchableTypo>
                }
                falseContent={null}
            />
        </>
    );
};

export default TaggedContent;
