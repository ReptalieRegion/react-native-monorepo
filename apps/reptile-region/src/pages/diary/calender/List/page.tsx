import { color } from '@crawl/design-system';
import dayjs from 'dayjs';
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import { PostWriteIcon } from '@/assets/icons';
import ExpandableCalendar from '@/components/@common/organisms/Calendars/components/ExpandableCalendar';
import FloatingActionButtonGroup from '@/components/share-post/organisms/FloatingActionButtons/components/FloatingActionButtonGroup';
import useCalendarNavigation from '@/hooks/diary/navigation/useCalendarNavigation';

export default function ExpandableCalendarScreen() {
    const today = useRef(dayjs().format('YYYY-MM-DD')).current;
    const { navigateCalendarCreate } = useCalendarNavigation();

    return (
        <View style={styles.wrapper}>
            <ExpandableCalendar date={today} minDate="1997-01-01" maxDate={today} />
            <FloatingActionButtonGroup position={{ right: 70, bottom: 70 }}>
                <FloatingActionButtonGroup.Button
                    name="primary"
                    Icon={PostWriteIcon}
                    iconStyle={primaryIcon}
                    onPress={navigateCalendarCreate}
                />
            </FloatingActionButtonGroup>
        </View>
    );
}

const primaryIcon = {
    width: 50,
    height: 50,
    backgroundColor: color.Teal[150].toString(),
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        position: 'relative',
        backgroundColor: color.White.toString(),
    },
    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        padding: 10,
    },
});
