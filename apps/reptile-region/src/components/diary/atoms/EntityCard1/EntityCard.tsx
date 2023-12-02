import { Typo, color } from '@reptile-region/design-system';
import type { ListRenderItemInfo } from '@shopify/flash-list';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import type { DiaryEntity } from '../../../../mocks/data/dirary-mock';
import GenderIcon from '../GenderIcon/GenderIcon';

import { Avatar } from '@/components/@common/atoms';
import TagView from '@/components/@common/atoms/TagView/TagView';

export default function EntityCard({ item }: ListRenderItemInfo<DiaryEntity>) {
    const { hatching, image, name, gender } = item;

    return (
        <View style={styles.wrapper}>
            <Avatar recyclingKey={image} image={{ src: image }} size={100} />
            <View style={styles.info}>
                <Typo>{name}</Typo>
                <TagView label="도마뱀" />
            </View>
            <View style={styles.right}>
                <GenderIcon gender={gender} />
                <Typo
                    variant="body4"
                    color="placeholder"
                >{`${hatching.getFullYear()}.${hatching.getMonth()}.${hatching.getDay()}`}</Typo>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 15,
        gap: 10,
        borderRadius: 20,
        paddingVertical: 10,
        marginHorizontal: 5,
    },
    info: {
        flex: 1,
        justifyContent: 'center',
        gap: 10,
    },
    right: {
        alignItems: 'flex-end',
        gap: 10,
        justifyContent: 'center',
    },
    tag: {
        width: 40,
        paddingVertical: 2,
        borderColor: color.Teal[150].toString(),
        borderRadius: 20,
        borderWidth: 1,
    },
    margin: {
        marginLeft: 10,
    },
    infoWrapper: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    empty: {
        flex: 1,
    },
});
