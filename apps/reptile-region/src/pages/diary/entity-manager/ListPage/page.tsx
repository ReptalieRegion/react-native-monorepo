import { color } from '@reptile-region/design-system';
import { FlashList, type ContentStyle } from '@shopify/flash-list';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { data, type DiaryEntity } from '../../../../mocks/data/dirary-mock';

import { PostWriteIcon, UpArrow } from '@/assets/icons';
import EntityCard from '@/components/diary/atoms/EntityCard/EntityCard';
import FloatingActionButtonGroup from '@/components/share-post/organisms/FloatingActionButtons/components/FloatingActionButtonGroup';
import useEntityMangerActions from '@/hooks/diary/actions/useEntityMangerActions';
import useEntityMangerNavigation from '@/hooks/diary/navigation/useEntityMangerNavigation';

type EntityMangerListPageProps = {};

export default function EntityMangerList({}: EntityMangerListPageProps) {
    const { flashListRef, handlePressUpFloatingButton, handleScroll } = useEntityMangerActions();
    const { navigateEntityCreatePage } = useEntityMangerNavigation();

    const keyExtractor = (item: DiaryEntity) => item.name;

    return (
        <View style={styles.container}>
            <FlashList
                ref={flashListRef}
                data={data}
                contentContainerStyle={contentStyle}
                renderItem={(props) => (
                    <View style={testStyle}>
                        <EntityCard {...props} />
                    </View>
                )}
                numColumns={2}
                keyExtractor={keyExtractor}
                onScroll={handleScroll}
                estimatedItemSize={212}
            />
            <FloatingActionButtonGroup position={{ right: 70, bottom: 70 }}>
                <FloatingActionButtonGroup.Button
                    name="primary"
                    Icon={PostWriteIcon}
                    iconStyle={primaryIcon}
                    onPress={navigateEntityCreatePage}
                />
                <FloatingActionButtonGroup.Button
                    name="secondary"
                    Icon={UpArrow}
                    iconStyle={secondaryIcon}
                    onPress={handlePressUpFloatingButton}
                />
            </FloatingActionButtonGroup>
        </View>
    );
}

const testStyle = {
    flex: 1,
    backgroundColor: color.White.toString(),
    ...Platform.select({
        ios: {
            shadowColor: '#7090B0',
            shadowOpacity: 0.15,
            shadowRadius: 15,
            shadowOffset: {
                width: 0,
                height: 1,
            },
        },
        android: {
            elevation: 24,
        },
    }),
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    marginRight: 5,
    marginBottom: 5,
};

const primaryIcon = {
    width: 50,
    height: 50,
    backgroundColor: color.Teal[150].toString(),
};

const secondaryIcon = {
    width: 50,
    height: 50,
    backgroundColor: color.White.toString(),
    borderColor: color.Gray[200].toString(),
    borderWidth: 1,
};

const contentStyle: ContentStyle = {
    paddingTop: 5,
    paddingHorizontal: 5,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
});
