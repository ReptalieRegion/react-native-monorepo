import { Typo, color } from '@reptile-region/design-system';
import type { ListRenderItemInfo } from '@shopify/flash-list';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import type { Data } from '../../../../pages/diary/test';

import Female from '@/assets/icons/Female';
import Male from '@/assets/icons/Male';
import Question from '@/assets/icons/Question';

const Tag = () => {
    return (
        <View style={styles.tagContainer}>
            <View style={styles.tag}>
                <Typo variant="body4" color="primary" textAlign="center">
                    개코 도마뱀
                </Typo>
            </View>
            <View style={styles.empty} />
        </View>
    );
};

const GenderIcon = ({ gender }: { gender: string }) => {
    switch (gender) {
        case '수컷':
            return <Male fill={color.Blue[500].toString()} />;
        case '암컷':
            return <Female fill={color.Pink[500].toString()} />;
        case '미구분':
            return <Question fill={color.Gray[500].toString()} />;
        default:
            return <></>;
    }
};

export default function Card2({ item }: ListRenderItemInfo<Data>) {
    const { hatchingDay, image, name, gender } = item;

    return (
        <View style={styles.wrapper}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.textContainer}>
                <View style={styles.topWrapper}>
                    <Tag />
                    <GenderIcon gender={gender} />
                </View>
                <Typo variant="body1">{name}</Typo>
                <Typo
                    variant="body3"
                    color="placeholder"
                >{`${hatchingDay.getFullYear()}.${hatchingDay.getMonth()}.${hatchingDay.getDay()}`}</Typo>
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
    tag: {
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderColor: color.Teal[150].toString(),
        borderRadius: 10,
        borderWidth: 1,
    },
    empty: {
        flex: 1,
    },
});
