import { color } from '@reptile-region/design-system';
import { FlashList, type ContentStyle } from '@shopify/flash-list';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { data, type Data } from '../test';

import { PostWriteIcon, UpArrow } from '@/assets/icons';
import Card1 from '@/components/diary/atoms/EntityCard/Card1';
import FloatingActionButtonGroup from '@/components/share-post/organisms/FloatingActionButtons/components/FloatingActionButtonGroup';
import FloatingActionButtons from '@/components/share-post/organisms/FloatingActionButtons/providers/FloatingActionButtons';
import useEntityMangerActions from '@/hooks/diary/actions/useEntityMangerActions';
import useEntityMangerNavigation from '@/hooks/diary/navigation/useEntityMangerNavigation';

type CalenderProps = {};

export default function Calender({}: CalenderProps) {
    const { flashListRef, handlePressUpFloatingButton, handleScroll } = useEntityMangerActions();
    const { navigateEntityCreatePage } = useEntityMangerNavigation();

    const keyExtractor = (item: Data) => item.name;

    return (
        <FloatingActionButtons>
            <View style={styles.container}>
                <FlashList
                    ref={flashListRef}
                    data={data}
                    contentContainerStyle={contentStyle}
                    renderItem={(props) => <Card1 {...props} />}
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
        </FloatingActionButtons>
    );
}

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
    paddingTop: 20,
    paddingHorizontal: 20,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
});
