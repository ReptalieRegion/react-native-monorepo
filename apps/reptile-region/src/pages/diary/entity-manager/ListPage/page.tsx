import { Typo, color } from '@reptile-region/design-system';
import { FlashList, type ContentStyle, type ListRenderItem } from '@shopify/flash-list';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { data, type Data } from './test';

import { PostWriteIcon, UpArrow } from '@/assets/icons';
import { Avatar } from '@/components/@common/atoms';
import FloatingActionButtonGroup from '@/components/share-post/organisms/FloatingActionButtons/components/FloatingActionButtonGroup';
import useEntityMangerActions from '@/hooks/diary/actions/useEntityMangerActions';
import useEntityMangerNavigation from '@/hooks/diary/navigation/useEntityMangerNavigation';

type EntityMangerListPageProps = {};

export default function EntityMangerList({}: EntityMangerListPageProps) {
    const { flashListRef, handlePressUpFloatingButton, handleScroll } = useEntityMangerActions();
    const { navigateEntityCreatePage } = useEntityMangerNavigation();

    const keyExtractor = (item: Data) => item.name;

    const renderItem: ListRenderItem<Data> = ({ item }) => {
        const { hatchingDay, image, morph, type, name, gender } = item;
        return (
            <View style={renderItemStyles.wrapper}>
                <View style={renderItemStyles.container}>
                    <Avatar recyclingKey={image} image={{ src: image }} size={100} />
                </View>
                <View>
                    <View style={renderItemStyles.infoContainer}>
                        <Typo variant="title4">이름</Typo>
                        <Typo>
                            {name} ({gender})
                        </Typo>
                    </View>
                    <View style={renderItemStyles.infoContainer}>
                        <Typo variant="title4">종류</Typo>
                        <Typo>{type}</Typo>
                    </View>
                    <View style={renderItemStyles.infoContainer}>
                        <Typo variant="title4">모프</Typo>
                        <Typo>{morph}</Typo>
                    </View>
                    <View style={renderItemStyles.infoContainer}>
                        <Typo variant="title4">해칭일</Typo>
                        <Typo>{`${hatchingDay.getFullYear()}.${hatchingDay.getMonth()}.${hatchingDay.getDay()}`}</Typo>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlashList
                ref={flashListRef}
                data={data}
                contentContainerStyle={contentStyle}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                onScroll={handleScroll}
                numColumns={2}
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
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
});

const renderItemStyles = StyleSheet.create({
    wrapper: {
        flex: 1,
        marginBottom: 20,
        paddingHorizontal: 20,
        gap: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    infoContainer: {
        flexDirection: 'row',
        gap: 10,
    },
});
