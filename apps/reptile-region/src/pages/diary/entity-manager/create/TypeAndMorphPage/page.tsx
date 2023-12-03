import { Typo } from '@reptile-region/design-system';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import TagView from '@/components/@common/atoms/TagView/TagView';
import useCreateEntity from '@/components/diary/organisms/CreateEntity/hooks/useCreateEntity';
import type { SelectedType } from '@/components/diary/organisms/CreateEntity/type';
import CreateTemplate from '@/components/diary/templates/CreateTemplate/CreateTemplate';
import type { EntityManagerCreateTypeAndMorphScreenProps } from '@/types/routes/props/diary';

export default function EntityManagerTypeAndMorphPage({ navigation }: EntityManagerCreateTypeAndMorphScreenProps) {
    const {
        entityDate: { variety },
        setCreateEntity,
    } = useCreateEntity();

    const nextPage = useCallback(() => {
        navigation.navigate('weight');
    }, [navigation]);

    const handlePressTag = (type: keyof SelectedType, value: string) => {
        setCreateEntity({ type: 'SET_VARIETY', variety: { type, value } });
    };

    return (
        <CreateTemplate
            title="종류와 모프를 선택해주세요."
            description="현재 개체의 종류와 모프를 알려주세요."
            contentsAlign="top"
            contents={
                <View style={styles.wrapper}>
                    <FlashList
                        data={variety.list}
                        renderItem={({ item }) => (
                            <View style={styles.container}>
                                <Typo variant="title2">{item.type}</Typo>
                                <Animated.View style={styles.tagContainer} entering={FadeIn} exiting={FadeOut}>
                                    {item.itemList?.map((value, index) => {
                                        const isSelectedColor =
                                            variety.selected.모프로컬.length !== 0 &&
                                            variety.selected.모프로컬.findIndex((selectedItem) => selectedItem === value) !== -1
                                                ? 'primary'
                                                : variety.selected[item.type] === value
                                                ? 'primary'
                                                : 'sub-placeholder';
                                        return (
                                            <TagView
                                                key={index}
                                                onPress={() => handlePressTag(item.type, value)}
                                                label={value}
                                                size="large"
                                                color={isSelectedColor}
                                            />
                                        );
                                    })}
                                </Animated.View>
                            </View>
                        )}
                        estimatedItemSize={69}
                    />
                </View>
            }
            button={
                <ConfirmButton
                    text="다음"
                    onPress={nextPage}
                    disabled={
                        variety.selected.분류.length === 0 ||
                        variety.selected.종.length === 0 ||
                        variety.selected.상세종.length === 0
                    }
                />
            }
        />
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    tagContainer: {
        flexDirection: 'row',
        marginTop: 10,
        gap: 15,
        flexWrap: 'wrap',
    },
    container: {
        marginBottom: 20,
    },
});
