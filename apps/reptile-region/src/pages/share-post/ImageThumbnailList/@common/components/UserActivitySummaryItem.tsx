import { Typo } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export type ActivitySummaryItemProps = {
    label: string;
    count: number;
};

export interface ActivitySummaryItemActions {
    onPress?(): void;
}

export default function UserActivitySummaryItem({
    label,
    count,
    onPress,
}: ActivitySummaryItemProps & ActivitySummaryItemActions) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <Typo variant="body2" textAlign="center">
                    {label + ' '}
                    <Typo variant="title4" color="primary">
                        {count}
                    </Typo>
                </Typo>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        minWidth: 60,
        justifyContent: 'center',
    },
});
