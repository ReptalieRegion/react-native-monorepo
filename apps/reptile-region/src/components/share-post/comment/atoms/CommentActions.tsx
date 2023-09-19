import { TouchableTypo } from 'design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import ConditionalRenderer from '@/components/common/element/ConditionalRenderer';

export type ActionButton = {
    label: string;
    showTarget: 'owner' | 'other';
    onPress?: () => void;
};

type CommentActionsProps = {
    isMine: boolean;
    actionButtons: ActionButton[];
};

const CommentActions = ({ actionButtons, isMine }: CommentActionsProps) => {
    return (
        <View style={styles.container}>
            {actionButtons.map((actionButton) => {
                const { label, showTarget, onPress } = actionButton;
                const condition = (showTarget === 'other' && !isMine) || (showTarget === 'owner' && isMine);

                return (
                    <ConditionalRenderer
                        key={label}
                        condition={condition}
                        trueContent={
                            <TouchableTypo variant="body4" color="placeholder" onPress={onPress}>
                                {label}
                            </TouchableTypo>
                        }
                        falseContent={null}
                    />
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
});

export default CommentActions;
