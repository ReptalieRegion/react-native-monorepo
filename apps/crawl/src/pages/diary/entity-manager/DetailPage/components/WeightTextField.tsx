import { Typo, color } from '@crawl/design-system';
import React, { useCallback, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import type { WeightUnit } from '@/types/apis/diary/entity';

type WeightTextFieldState = {
    entity: {
        weightUnit: WeightUnit;
    };
};

interface WeightTextFieldActions {}

type WeightTextFieldProps = WeightTextFieldState & WeightTextFieldActions;

export default function WeightTextField({ entity: { weightUnit } }: WeightTextFieldProps) {
    const [weight, setWeight] = useState('');

    const handleChangeWeight = useCallback((text: string) => {
        const textSize = text.length;
        const reg = /^-?\d*(\.\d*)\.+$/;
        const dotRemoveText = reg.test(text) ? text.slice(0, textSize - 1) : text;
        const newText = dotRemoveText[0] === '.' ? '0' + text : dotRemoveText;
        setWeight(newText);
    }, []);

    return (
        <View style={styles.content}>
            <Typo variant="title3">{`몸무게 ${weightUnit}`}</Typo>
            <View style={styles.inputWrapper}>
                <TextInput
                    value={weight}
                    keyboardType="numeric"
                    onChangeText={handleChangeWeight}
                    style={styles.input}
                    textAlign="center"
                    autoFocus
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        gap: 10,
    },
    input: {
        padding: 0,
        width: '100%',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: color.Gray[500].toString(),
        borderRadius: 10,
        gap: 10,
        height: 45,
    },
});
