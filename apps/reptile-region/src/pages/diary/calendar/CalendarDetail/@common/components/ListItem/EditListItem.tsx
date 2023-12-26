import { Typo } from '@crawl/design-system';
import React, { type ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import TouchableScale from '../../../../../../../components/@common/atoms/TouchableScale';

import { styles } from './styles';

import { ChevronRight } from '@/assets/icons';
import { ConditionalRenderer } from '@/components/@common/atoms';

type EditListItemState = {
    label: string;
    content: string | undefined | ReactNode;
    emptyLabel?: string;
    containerStyle?: Pick<
        ViewStyle,
        | 'padding'
        | 'paddingBottom'
        | 'paddingEnd'
        | 'paddingHorizontal'
        | 'paddingLeft'
        | 'paddingRight'
        | 'paddingStart'
        | 'paddingTop'
        | 'paddingVertical'
    >;
};

interface EditListItemActions {
    onPress?(): void;
}

export type EditListItemProps = EditListItemState & EditListItemActions;

export default function EditListItem({ label, content, emptyLabel, containerStyle, onPress }: EditListItemProps) {
    return (
        <TouchableScale containerStyle={containerStyle} onPress={onPress}>
            <View style={styles.wrapper}>
                <Typo variant="title2">{label}</Typo>
                <View style={rightStyles.wrapper}>
                    <ConditionalRenderer condition={!!content} trueContent={content} falseContent={<Typo>{emptyLabel}</Typo>} />
                    <ChevronRight />
                </View>
            </View>
        </TouchableScale>
    );
}

const rightStyles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        gap: 10,
    },
});
