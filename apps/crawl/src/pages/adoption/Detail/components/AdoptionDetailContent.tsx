import { Typo, color } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Avatar } from '@/components/@common/atoms';
import type { AdoptionPost } from '@/types/apis/adoption';
import { calculateTimeAgo } from '@/utils/date';
import { formatToGender } from '@/utils/format/formatToGender';

type AdoptionDetailContentState = {
    data: AdoptionPost;
};

interface AdoptionDetailContentActions {}

type AdoptionDetailContentProps = AdoptionDetailContentState & AdoptionDetailContentActions;

export default function AdoptionDetailContent({ data }: AdoptionDetailContentProps) {
    return (
        <>
            <View style={styles.profileWrapper}>
                <Avatar image={data.user.profile} size={50} />
                <View>
                    <Typo variant="title3">{data.user.nickname}</Typo>
                    <Typo variant="body3" color="placeholder">{`${data.location.sido} ${data.location.gungu}`}</Typo>
                </View>
            </View>
            <View style={styles.contentWrapper}>
                <Typo variant="title2">{data.title}</Typo>
                <Typo variant="body4" color="placeholder">
                    {calculateTimeAgo(data.createdAt)}
                </Typo>
                <View style={styles.boxWrapper}>
                    <View style={[styles.paddingVertical, styles.borderBottom, styles.boxContainer]}>
                        <BoxContent label="종" content={`${data.variety.classification} / ${data.variety.species}`} />
                        <BoxContent
                            label="모프"
                            content={`${data.variety.detailedSpecies} / ${data.variety.morph?.join(' • ')}`}
                        />
                    </View>
                    <View style={[styles.row, styles.gap, styles.paddingVertical]}>
                        <BoxContent label="성별" content={formatToGender(data.gender)} />
                        <BoxContent label="크기" content={data.size} />
                    </View>
                </View>
                <Typo>{data.content}</Typo>
            </View>
        </>
    );
}

function BoxContent({ label, content }: { label: string; content: string }) {
    return (
        <View style={styles.row}>
            <View style={styles.boxWidth}>
                <Typo color="sub-placeholder">{label}</Typo>
            </View>
            <Typo>{content}</Typo>
        </View>
    );
}

const styles = StyleSheet.create({
    priceWrapper: {
        flex: 1,
        paddingLeft: 10,
    },
    row: {
        flexDirection: 'row',
    },
    gap: {
        gap: 20,
    },
    boxWidth: {
        width: 40,
    },
    paddingVertical: {
        paddingVertical: 10,
    },
    profileWrapper: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        gap: 10,
        borderBottomWidth: 1,
        borderBottomColor: color.Gray[200].toString(),
        backgroundColor: color.White.toString(),
        zIndex: 10,
    },
    contentWrapper: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: color.White.toString(),
        zIndex: 10,
    },
    boxWrapper: {
        backgroundColor: color.Gray[200].toString(),
        borderRadius: 10,
        paddingHorizontal: 10,
        gap: 5,
        marginVertical: 20,
    },
    boxContainer: {
        gap: 5,
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: color.Gray[500].toString(),
    },
});
