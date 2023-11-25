import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Typo, color } from '@reptile-region/design-system';
import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Divider } from '@/components/@common/atoms/Divider';
import ListItem from '@/components/@common/molecules/ListItem/Item';
import type { RootRoutesParamList } from '@/types/routes/param-list';

const licenseList = require('@/json/license.json');

type License = {
    libraryName: string;
    description?: string;
    licenseType: string;
    licenseContent: string;
    homepage?: string;
};

type LicenseListScreenProps = NativeStackScreenProps<RootRoutesParamList, 'me/license'>;

const ItemSeparatorComponent = () => {
    return <Divider />;
};

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
        paddingBottom: 25,
    },
});
