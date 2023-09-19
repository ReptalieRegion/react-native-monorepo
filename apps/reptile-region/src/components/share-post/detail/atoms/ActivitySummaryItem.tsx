import { Typo } from 'design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

type ActivitySummaryItemProps = {
    onPress?: () => void;
    content: string;
    count: number;
};

const ActivitySummaryItem = ({ onPress, content, count }: ActivitySummaryItemProps) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <Typo variant="body2">{content}</Typo>
                <Typo variant="body2" color="primary">
                    {count}
                </Typo>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
});

export default ActivitySummaryItem;
