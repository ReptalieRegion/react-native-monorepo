import { Typo, color } from '@crawl/design-system';
import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import type { License, LicenseListScreenProps } from '../type';

import { Divider } from '@/components/@common/atoms/Divider';
import ListItem from '@/components/@common/molecules/ListItem/Item';

const licenseList = require('@/json/license.json');

export default function LicenseListPage({ navigation }: LicenseListScreenProps) {
    const data = licenseList as License[];

    const navigateLicenseContents = (props: License) => {
        navigation.navigate('me/license/contents', props);
    };

    const renderItem: ListRenderItem<License> = ({ item }) => {
        return (
            <ListItem
                onPress={() => navigateLicenseContents(item)}
                leftChildren={<Typo>{item.libraryName}</Typo>}
                rightChildren={<ListItem.Chevron />}
            />
        );
    };

    return (
        <View style={styles.container}>
            <FlashList
                data={data}
                renderItem={renderItem}
                estimatedItemSize={50}
                ItemSeparatorComponent={ItemSeparatorComponent}
            />
        </View>
    );
}

function ItemSeparatorComponent() {
    return <Divider />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
        paddingBottom: 25,
    },
});
