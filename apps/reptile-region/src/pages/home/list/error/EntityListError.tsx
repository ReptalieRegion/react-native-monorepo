import { Typo } from '@crawl/design-system';
import React from 'react';
import { View } from 'react-native';

type EntityListErrorState = {};

interface EntityListErrorActions {}

type EntityListErrorProps = EntityListErrorState & EntityListErrorActions;

export default function EntityListError({}: EntityListErrorProps) {
    return (
        <View>
            <View>
                <Typo>hi</Typo>
            </View>
        </View>
    );
}
