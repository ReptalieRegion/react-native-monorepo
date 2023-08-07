import React, { ReactNode, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { color } from '../../tokens/colors';

import useLock from '@/hooks/useLock';

interface AccordionMenuProps {
    numberOfLines: number;
    children: ReactNode;
    toggleText?: {
        expanded: string;
        collapsed: string;
    };
}

const AccordionMenu = ({
    children,
    numberOfLines,
    toggleText = { expanded: '...접기', collapsed: '...더보기' },
}: AccordionMenuProps) => {
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
                {children}
            </Text>
            {showAccordionMenu && (
                <Text style={styles.grayFont} onPress={() => setIsExpanded((state) => !state)} suppressHighlighting={true}>
                    {isExpanded ? toggleText.expanded : toggleText.collapsed}
                </Text>
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
