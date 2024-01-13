import { BottomSheet, useBottomSheet } from '@crawl/bottom-sheet';
import { useCalendar } from '@crawl/calendar';
import { Typo } from '@crawl/design-system';
import { useOverlay } from '@crawl/overlay-manager';
import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import SelectDateBottomSheet, { type SelectDateProps } from './SelectDate';

import { CancelButton } from '@/assets/icons';
import { ConditionalRenderer } from '@/components/@common/atoms';

export default function useOverlaySelectDate() {
    const overlay = useOverlay();
    const { setDate } = useCalendar();

    const openSelectDateBottomSheet = useCallback(
        ({ searchDate }: Pick<SelectDateProps, 'searchDate'>) => {
            return new Promise<boolean>((resolve) => {
                overlay.open(({ isOpen, close }) => (
                    <ConditionalRenderer
                        condition={isOpen}
                        trueContent={
                            <BottomSheet
                                onClose={() => {
                                    resolve(false);
                                    close();
                                }}
                                header={Header}
                                snapInfo={{ pointsFromTop: [533, '85%'], startIndex: 0 }}
                            >
                                <SelectDateBottomSheet
                                    searchDate={searchDate}
                                    onPressMonth={(date) => setDate(dayjs(date).endOf('month').format('YYYY-MM-DD'))}
                                />
                            </BottomSheet>
                        }
                    />
                ));
            });
        },
        [overlay, setDate],
    );

    return openSelectDateBottomSheet;
}

function Header() {
    const { bottomSheetClose } = useBottomSheet();

    return (
        <View style={styles.headerWrapper}>
            <Typo variant="title2">월 선택하기</Typo>
            <TouchableOpacity onPress={bottomSheetClose}>
                <CancelButton width={28} height={28} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    headerWrapper: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
