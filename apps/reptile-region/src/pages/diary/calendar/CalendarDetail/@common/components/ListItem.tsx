import { Typo } from '@crawl/design-system';
import React, { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { ChevronRight } from '@/assets/icons';

type ListItemState = {
    label: string;
    content: string | undefined | ReactNode;
};

interface ListItemActions {}

type ListItemProps = ListItemState & ListItemActions;

export default function ListItem({ label, content }: ListItemProps) {
    return (
        <View style={articleStyles.wrapper}>
            <Typo variant="title2">{label}</Typo>
            <View style={articleStyles.memoContainer}>
                {content}
                <ChevronRight />
            </View>
        </View>
    );
}

const articleStyles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 30,
    },
    memoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        gap: 10,
    },
});
