import { Typo, color } from '@reptile-region/design-system';
import type { ListRenderItemInfo } from '@shopify/flash-list';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import type { Data } from '../../../../pages/diary/test';

import { Avatar } from '@/components/@common/atoms';

export default function Card1({ item }: ListRenderItemInfo<Data>) {
    const { hatchingDay, image, name } = item;

    return (
        <View style={styles.wrapper}>
            <Avatar recyclingKey={image} image={{ src: image }} size={100} />
            <View style={styles.info}>
                <View style={styles.infoWrapper}>
                    <Typo>{name}</Typo>
                    <Typo
                        variant="body4"
                        color="placeholder"
                    >{`${hatchingDay.getFullYear()}.${hatchingDay.getMonth()}.${hatchingDay.getDay()}`}</Typo>
                </View>
                <View style={styles.margin}>
                    <View style={styles.tag}>
                        <Typo variant="body5" color="primary" textAlign="center">
                            도마뱀
                        </Typo>
                    </View>
                    <View style={styles.empty} />
                </View>
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
