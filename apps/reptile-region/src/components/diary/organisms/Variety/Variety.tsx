import { Typo } from '@crawl/design-system';
import { FlashList, type ContentStyle, type ListRenderItem } from '@shopify/flash-list';
import React, { useEffect, useReducer } from 'react';
import { StyleSheet, View } from 'react-native';

import { classificationList, detailedSpeciesList, morphList, speciesList } from './constants';
import type { VarietyListItem } from './type';
import varietyReducer from './varietyReducer';

import { ConditionalRenderer } from '@/components/@common/atoms';
import TagView from '@/components/@common/atoms/TagView/TagView';
import type { EntityVariety } from '@/types/apis/diary/entity';

type VarietyListState = {
    initialSelected?: EntityVariety;
};

interface VarietyListAction {
    onChangeVariety?(props: EntityVariety): void;
}

type VarietyListProps = VarietyListState & VarietyListAction;

export default function VarietyList({
    initialSelected = { classification: '', detailedSpecies: '', species: '', morph: [''] },
    onChangeVariety,
}: VarietyListProps) {
    const [state, dispatch] = useReducer(varietyReducer, {
        list: [
            '분류',
            {
                varietyType: 'classification',
                data: classificationList,
            },
            '종',
            {
                varietyType: 'species',
                data: speciesList[initialSelected.classification] ? speciesList[initialSelected.classification] : [],
            },
            '상세종',
            {
                varietyType: 'detailedSpecies',
                data: detailedSpeciesList[initialSelected.species] ? detailedSpeciesList[initialSelected.species] : [],
            },
            '모프로컬',
            {
                varietyType: 'morph',
                data: morphList[initialSelected.detailedSpecies] ? morphList[initialSelected.detailedSpecies] : [],
            },
        ],
        selected: initialSelected,
    });

    useEffect(() => {
        onChangeVariety?.(state.selected);
    }, [onChangeVariety, state.selected]);

    const renderItem: ListRenderItem<string | VarietyListItem> = ({ item, extraData }) => {
        if (typeof item === 'string') {
            return <Typo variant="title2">{item}</Typo>;
        } else {
            const selected = extraData as EntityVariety;
            const handlePressTag = (name: string) => {
                dispatch({ type: 'SELECT', value: name, varietyType: item.varietyType });
            };

            return (
                <ConditionalRenderer
                    condition={item.data?.length !== 0}
                    trueContent={
                        <View style={[renderItemStyles.itemsContainer, renderItemStyles.marginBottom]}>
                            {item.data?.map((name, index) => {
                                const selectedColor =
                                    selected.morph && selected.morph.findIndex((selectedItem) => selectedItem === name) !== -1
                                        ? 'primary'
                                        : selected[item.varietyType] === name
                                        ? 'primary'
                                        : 'placeholder';

                                return (
                                    <TagView
                                        key={index}
                                        label={name}
                                        color={selectedColor}
                                        size="large"
                                        onPress={() => handlePressTag(name)}
                                    />
                                );
                            })}
                            <TagView
                                onPress={() => handlePressTag('기타')}
                                label={'기타'}
                                size="large"
                                color={
                                    item.varietyType === 'morph'
                                        ? selected.morph?.findIndex((selectedItem) => selectedItem === '기타') !== -1
                                            ? 'primary'
                                            : 'placeholder'
                                        : selected[item.varietyType] === '기타'
                                        ? 'primary'
                                        : 'placeholder'
                                }
                            />
                        </View>
                    }
                    falseContent={<View style={renderItemStyles.marginBottom} />}
                />
            );
        }
    };

    return (
        <View style={styles.wrapper}>
            <FlashList
                data={state.list}
                extraData={state.selected}
                renderItem={renderItem}
                contentContainerStyle={contentContainerStyle}
                getItemType={(item) => (typeof item === 'string' ? 'header' : 'row')}
                estimatedItemSize={30}
            />
        </View>
    );
}

const contentContainerStyle: ContentStyle = {
    paddingBottom: 20,
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
});

const renderItemStyles = StyleSheet.create({
    itemsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        gap: 8,
    },
    marginBottom: {
        marginBottom: 20,
    },
});
