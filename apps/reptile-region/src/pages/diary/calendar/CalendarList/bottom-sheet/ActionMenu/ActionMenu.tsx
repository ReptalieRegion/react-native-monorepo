import { BottomSheet } from '@crawl/bottom-sheet';
import { Typo } from '@crawl/design-system';
import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useDeleteCalendarItem from '@/apis/diary/calendar/hooks/mutations/useDeleteCalendarItem';

type ActionMenuState = {
    calendar: {
        id: string;
    };
    isShowBottomSheet: boolean;
};

interface ActionMenuActions {
    onClose(): void;
}

export type ActionMenuProps = ActionMenuState & ActionMenuActions;

export default function ActionMenuBottomSheet({ calendar, isShowBottomSheet, onClose }: ActionMenuProps) {
    const { mutate } = useDeleteCalendarItem();

    const list = [
        {
            label: '삭제',
            onPress: () => {
                mutate({ calendarId: calendar.id });
            },
        },
        {
            label: '수정',
            onPress: () => {},
        },
    ];

    return (
        <Modal transparent visible={isShowBottomSheet}>
            <BottomSheet onClose={onClose} snapInfo={{ pointsFromTop: [59 + 38 * list.length], startIndex: 0 }}>
                <View style={styles.content}>
                    {list.map(({ label, onPress }) => (
                        <TouchableOpacity key={label} style={styles.listItem} onPress={onPress}>
                            <Typo>{label}</Typo>
                        </TouchableOpacity>
                    ))}
                </View>
            </BottomSheet>
        </Modal>
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
