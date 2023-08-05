import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextProps, TextStyle, TouchableWithoutFeedback, View } from 'react-native';

import { color } from '../../tokens/colors';

import useLock from '@/hooks/useLock';

type TextType = {
    key: string;
    style?: TextStyle;
    props?: Omit<TextProps, 'style'>;
    content: string;
};

interface AccordionMenuProps {
    numberOfLines: number;
    texts: TextType[];
    accordionText?: string;
}

const AccordionMenu = ({ texts, numberOfLines }: AccordionMenuProps) => {
    const { isLock, lockEnd, lockStart } = useLock();
    const [showAccordionMenu, setShowAccordionMenu] = useState<boolean>(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        return () => {
            lockEnd();
        };
    }, [lockEnd]);

    return (
        <View>
            <Text
                numberOfLines={showAccordionMenu && !isExpanded ? numberOfLines : undefined}
                onTextLayout={(event) => {
                    if (!isLock()) {
                        lockStart();
                        setShowAccordionMenu(event.nativeEvent.lines.length > numberOfLines);
                    }
                }}
            >
                {texts.map((text) => (
                    <Text key={text.key} style={text.style} {...text.props}>
                        {text.content}
                    </Text>
                ))}
            </Text>
            {showAccordionMenu && (
                <TouchableWithoutFeedback onPress={() => setIsExpanded((state) => !state)}>
                    <View>
                        <Text style={styles.grayFont}>{isExpanded ? '...접기' : '...더보기'}</Text>
                    </View>
                </TouchableWithoutFeedback>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    grayFont: {
        color: color.Gray[500].toString(),
    },
});

export default AccordionMenu;
