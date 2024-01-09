import { useBottomSheet } from '@crawl/bottom-sheet';
import { Typo, color } from '@crawl/design-system';
import { FlashList } from '@shopify/flash-list';
import dayjs from 'dayjs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Check } from '@/assets/icons';
import { ConditionalRenderer } from '@/components/@common/atoms';
import { generateMonthList } from '@/utils/date';

type SelectDateState = {
    searchDate: dayjs.Dayjs;
};

type SelectDateActions = {
    onPressMonth(date: string): void;
};

export type SelectDateProps = SelectDateState & SelectDateActions;

const dateList = generateMonthList('1997-01-01');

export default function SelectDateBottomSheet({ searchDate, onPressMonth }: SelectDateProps) {
    const { bottomSheetClose } = useBottomSheet();
    const startIndex = dateList.findIndex((item) => searchDate.isSame(item, 'month'));

    return (
        <View style={styles.content}>
            <FlashList
                data={dateList}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            key={item}
                            style={styles.listItem}
                            onPress={() => {
                                onPressMonth(item);
                                bottomSheetClose();
                            }}
                        >
                            <Typo>{dayjs(item).format('YYYY년 M월')}</Typo>
                            <ConditionalRenderer
                                condition={searchDate.isSame(item, 'month')}
                                trueContent={<Check width={26} height={26} fill={color.Teal[150].toString()} />}
                            />
                        </TouchableOpacity>
                    );
                }}
                estimatedItemSize={50}
                initialScrollIndex={Math.max(0, startIndex - 4)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    listItem: {
        paddingHorizontal: 20,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
