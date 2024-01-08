import { Typo, color } from '@crawl/design-system';
import { Image } from 'expo-image';
import React, { type ReactNode } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View, type DimensionValue } from 'react-native';

import GenderIcon from '../../../../../components/@common/molecules/GenderIcon/GenderIcon';

import { ConditionalRenderer } from '@/components/@common/atoms';
import TagView from '@/components/@common/atoms/TagView/TagView';
import type { FetchEntityListResponse } from '@/types/apis/diary/entity';

type EntityCardState = {
    data: FetchEntityListResponse;
    containerStyles?: {
        marginRight?: DimensionValue;
        marginBottom?: DimensionValue;
    };
    placeholderImage?: ReactNode;
};

interface EntityCardActions {
    onPress?(): void;
}

type EntityCardProps = EntityCardState & EntityCardActions;

export default function EntityCard({
    data: {
        entity: { hatching, image, name, gender, variety },
    },
    containerStyles,
    placeholderImage,
    onPress,
}: EntityCardProps) {
    return (
        <TouchableOpacity style={[styles.wrapper, containerStyles]} onPress={onPress}>
            <View style={styles.container}>
                <ConditionalRenderer
                    condition={!!placeholderImage}
                    trueContent={placeholderImage}
                    falseContent={<Image source={{ uri: image.src }} style={styles.image} />}
                />
                <View style={styles.textContainer}>
                    <View style={styles.topWrapper}>
                        <TagView label={variety.detailedSpecies} />
                        <GenderIcon gender={gender} />
                    </View>
                    <Typo
                        variant="body1"
                        textBreakStrategy="highQuality"
                        lineBreakMode="clip"
                        lineBreakStrategyIOS="hangul-word"
                        numberOfLines={1}
                    >
                        {name}
                    </Typo>
                    <ConditionalRenderer
                        condition={!!hatching}
                        trueContent={
                            <Typo variant="body3" color="placeholder">
                                {hatching}
                            </Typo>
                        }
                        falseContent={null}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: color.White.toString(),
        ...Platform.select({
            ios: {
                shadowColor: color.DarkGray[500].toString(),
                shadowOpacity: 0.12,
                shadowRadius: 5,
                shadowOffset: {
                    width: 0,
                    height: -1,
                },
            },
            android: {
                elevation: 10,
            },
        }),
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    image: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        aspectRatio: '1/1',
        width: '100%',
    },
    container: {
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
