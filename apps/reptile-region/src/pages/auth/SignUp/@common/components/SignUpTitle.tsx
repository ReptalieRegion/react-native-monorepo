import { Typo } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ConditionalRenderer } from '@/components/@common/atoms';

type SignUpTitleState = {
    title: string;
    description?: string;
};

type SignUpTitleProps = SignUpTitleState;

export default function SignUpTitle({ title, description }: SignUpTitleProps) {
    return (
        <View style={styles.container}>
            <Typo variant="heading1Bold">{title}</Typo>
            <ConditionalRenderer
                condition={!!description}
                trueContent={<Typo variant="body2">{description}</Typo>}
                falseContent={null}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 5,
    },
});
