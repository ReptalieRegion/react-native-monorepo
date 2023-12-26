import { BottomSheet } from '@crawl/bottom-sheet';
import { Typo } from '@crawl/design-system';
import dayjs from 'dayjs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useDeleteCalendarItem from '../../hooks/mutations/useDeleteCalendarItem';

import { ConditionalRenderer } from '@/components/@common/atoms';

type ActionMenuState = {
    calendar: {
        id: string;
        date: string;
    };
    isOpen: boolean;
};

interface ActionMenuActions {
    onClose(): void;
}

export type ActionMenuProps = ActionMenuState & ActionMenuActions;

export default function ActionMenuBottomSheet({ calendar, isOpen, onClose }: ActionMenuProps) {
    const { mutate } = useDeleteCalendarItem({ searchDate: dayjs(calendar.date).startOf('month').format('YYYY-MM-DD') });

    const list = [
        {
            label: '삭제',
            onPress: () => {
                onClose();
                mutate({ calendarId: calendar.id });
            },
        },
        {
            label: '수정',
            onPress: () => {},
        },
    ];

    return (
        <ConditionalRenderer
            condition={isOpen}
            trueContent={
                <BottomSheet onClose={onClose} snapInfo={{ pointsFromTop: [59 + 38 * list.length], startIndex: 0 }}>
                    <View style={styles.content}>
                        {list.map(({ label, onPress }) => (
                            <TouchableOpacity key={label} style={styles.listItem} onPress={onPress}>
                                <Typo>{label}</Typo>
                            </TouchableOpacity>
                        ))}
                    </View>
                </BottomSheet>
            }
        />
    );
}

const styles = StyleSheet.create({
    content: {
        paddingTop: 5,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
    },
    listItem: {
        paddingTop: 10,
        paddingBottom: 10,
    },
});
