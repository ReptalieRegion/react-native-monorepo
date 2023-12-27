import { Typo, color } from '@crawl/design-system';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useCreateReport from '../../hooks/mutations/useCreateReport';

import { ReportDetailsType, ReportType } from '@/types/apis/report';

type ReportListState = {
    report: {
        reported: string;
        type: ReportType;
        typeId: string;
    };
};

export type ReportListProps = ReportListState;

const listItem = [
    ReportDetailsType.ABUSE_LANGUAGE,
    ReportDetailsType.ADVERTISING,
    ReportDetailsType.ILLEGAL_INFORMATION,
    ReportDetailsType.PORNOGRAPHY,
    ReportDetailsType.PRIVACY_EXPOSURE,
];

export default function ReportListBottomSheet({ report: { reported, type, typeId } }: ReportListProps) {
    const { mutate } = useCreateReport();

    const handlerPressReport = (details: ReportDetailsType) => {
        mutate({ type, details, reported, typeId });
    };

    return (
        <FlashList
            data={listItem}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.listItem} onPress={() => handlerPressReport(item)}>
                    <Typo>{item}</Typo>
                </TouchableOpacity>
            )}
            estimatedItemSize={38}
        />
    );
}

const styles = StyleSheet.create({
    listItem: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: color.Gray[250].toString(),
    },
});
