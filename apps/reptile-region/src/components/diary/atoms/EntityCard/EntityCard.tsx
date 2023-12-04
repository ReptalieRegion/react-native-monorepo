import { Typo } from '@reptile-region/design-system';
import type { ListRenderItemInfo } from '@shopify/flash-list';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import GenderIcon from '../GenderIcon/GenderIcon';

import TagView from '@/components/@common/atoms/TagView/TagView';
import type { FetchEntityListResponse } from '@/types/apis/diary/entity';

export default function EntityCard({ item }: ListRenderItemInfo<FetchEntityListResponse>) {
    const {
        entity: { hatching, image, name, gender, variety },
    } = item;

    return (
        <View style={styles.wrapper}>
            <Image recyclingKey={image.src} source={{ uri: image.src }} style={styles.image} />
            <View style={styles.textContainer}>
                <View style={styles.topWrapper}>
                    <TagView label={variety.detailedSpecies} />
                    <GenderIcon gender={gender} />
                </View>
                <Typo variant="body1">{name}</Typo>
                <Typo variant="body3" color="placeholder">{`${hatching}`}</Typo>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        width: '100%',
        aspectRatio: '1/1',
    },
    wrapper: {
        flex: 1,
        gap: 10,
        borderRadius: 20,
        paddingVertical: 10,
        marginHorizontal: 5,
    },
    textContainer: {
        paddingHorizontal: 10,
        gap: 7,
    },
    topWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tagContainer: {
        flexDirection: 'row',
    },
});
