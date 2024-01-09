import { Typo, color } from '@crawl/design-system';
import type { ListRenderItem } from '@shopify/flash-list';
import { Image } from 'expo-image';
import React from 'react';
import { Platform, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { ConditionalRenderer } from '@/components/@common/atoms';
import TagView from '@/components/@common/atoms/TagView/TagView';
import BasicImageCarousel from '@/components/@common/molecules/BasicImageCarousel/BasicImageCarousel';
import GenderIcon from '@/components/@common/molecules/GenderIcon/GenderIcon';
import useInfiniteFetchEntity from '@/pages/diary/entity-manager/ListPage/hooks/queries/useInfiniteFetchEntity';
import EntityEmpty from '@/pages/home/List/components/EntityEmpty';
import type { FetchEntityListResponse } from '@/types/apis/diary/entity';
import type { EntityDetailParams } from '@/types/routes/params/diary';

type EntityListState = {
    carouselProps: {
        gap: number;
        offset: number;
        width: number;
        height: number;
        marginVertical: number;
        marginHorizontal: number;
    };
};

interface EntityListActions {
    navigateEntityDetail(params: EntityDetailParams): void;
}

type EntityListProps = EntityListState & EntityListActions;

export default function EntityList({ carouselProps, navigateEntityDetail }: EntityListProps) {
    const { data } = useInfiniteFetchEntity();

    const wrapperStyle: StyleProp<ViewStyle> = [
        styles.shadowWrapper,
        {
            width: carouselProps.width,
            marginHorizontal: carouselProps.marginHorizontal,
            marginVertical: carouselProps.marginVertical,
        },
    ];

    const imageStyle = {
        width: carouselProps.width,
        height: carouselProps.height,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    };

    const keyExtractor = (item: FetchEntityListResponse) => item.entity.id;

    const renderItem: ListRenderItem<FetchEntityListResponse> = ({
        item: {
            entity: { id, gender, hatching, image, name, variety },
        },
    }) => {
        return (
            <TouchableOpacity
                style={wrapperStyle}
                containerStyle={styles.container}
                onPress={() => navigateEntityDetail({ entityId: id })}
            >
                <View style={styles.itemWrapper}>
                    <Image source={{ uri: image.src }} style={imageStyle} />
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
    };

    return (
        <BasicImageCarousel
            carouselProps={carouselProps}
            listProps={{
                data: data.slice(0, 10),
                keyExtractor,
                renderItem,
                estimatedItemSize: imageStyle.width,
                estimatedListSize: imageStyle,
                ListEmptyComponent: EntityEmpty({ containerStyle: wrapperStyle }),
            }}
        />
    );
}

const styles = StyleSheet.create({
    shadowWrapper: {
        flex: 1,
        backgroundColor: color.White.toString(),
        ...Platform.select({
            ios: {
                shadowColor: color.DarkGray[500].toString(),
                shadowOpacity: 0.1,
                shadowRadius: 5,
                shadowOffset: {
                    width: 0,
                    height: -1,
                },
            },
            android: {
                elevation: 1,
            },
        }),
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 5,
        paddingBottom: 5,
        minHeight: 286,
    },
    container: {
        flex: 1,
    },
    itemWrapper: {
        flex: 1,
        gap: 10,
        borderRadius: 20,
        paddingVertical: 10,
    },
    textContainer: {
        gap: 7,
    },
    topWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imageBorder: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
});
