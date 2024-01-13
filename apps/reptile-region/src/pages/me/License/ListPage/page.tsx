import { Typo } from '@crawl/design-system';
import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import React from 'react';
import { StyleSheet } from 'react-native';

import type { License } from './type';

import { Divider } from '@/components/@common/atoms/Divider';
import ListItem from '@/components/@common/molecules/ListItem/Item';
import PageWrapper from '@/components/PageWrapper';
import type { LicenseListScreenProps } from '@/types/routes/props/me/license';

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
        <PageWrapper style={styles.wrapper}>
            <FlashList data={data} renderItem={renderItem} estimatedItemSize={50} ItemSeparatorComponent={Divider} />
        </PageWrapper>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        paddingBottom: 25,
    },
});
