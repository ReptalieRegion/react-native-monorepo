import { BottomSheet } from '@reptile-region/bottom-sheet';
import { TouchableTypo, Typo, color } from '@reptile-region/design-system';
import { useOnOff } from '@reptile-region/react-hooks';
import dayjs from 'dayjs';
import { Image } from 'expo-image';
import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { ChangeHeader } from './header';

import useInfiniteFetchEntity from '@/apis/diary/entity-manager/hooks/queries/useInfiniteFetchEntity';
import { Plus } from '@/assets/icons';
import { ConditionalRenderer, TextField } from '@/components/@common/atoms';
import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import GenderIcon from '@/components/diary/atoms/GenderIcon/GenderIcon';
import InfiniteLineChart from '@/components/diary/organisms/Chart/components/InfiniteLineChart';
import type { EntityManagerDetailScreenProps } from '@/types/routes/props/diary';

export default function EntityManagerDetailPage(props: EntityManagerDetailScreenProps) {
    const {
        route: {
            params: { entityId },
        },
    } = props;

    const { width } = useWindowDimensions();
    const { data } = useInfiniteFetchEntity();

    const { off, on, state } = useOnOff();

    const foundEntity = data.find(({ entity }) => entity.id === entityId);
    if (foundEntity === undefined) {
        return null;
    }

    const {
        entity: { gender, hatching, image, name, variety, weightUnit },
    } = foundEntity;

    return (
        <>
            <ChangeHeader {...props} />
            <ScrollView style={styles.wrapper} contentContainerStyle={styles.wrapperContent}>
                <Image source={{ uri: image.src }} style={{ width, height: width }} />
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <Typo variant="title1">{name}</Typo>
                        <GenderIcon gender={gender} size={31} />
                        <View style={styles.hatchingContainer}>
                            <Typo color="placeholder">{dayjs(hatching).format('YYYY-MM-DD')}</Typo>
                        </View>
                    </View>
                    <View style={styles.tagContainer}>
                        <Typo variant="body1" color="primary">
                            {variety.classification} · {variety.species}
                        </Typo>
                    </View>
                    <View style={styles.tagContainer}>
                        <Typo variant="body1" color="primary">
                            {variety.detailedSpecies} {variety.morph ? `· ${variety.morph?.join(', ')}` : ''}
                        </Typo>
                    </View>
                </View>
                <View>
                    <View style={styles.titleContainer} onLayout={(event) => console.log(event.nativeEvent.layout.y)}>
                        <Typo variant="heading1Bold">최근 무게</Typo>
                        <TouchableOpacity style={styles.plusContainer} onPress={on}>
                            <Plus width={16} height={16} fill={color.White.toString()} />
                        </TouchableOpacity>
                        <View style={styles.weightDetailButtonContainer}>
                            <TouchableTypo variant="title5" color="placeholder">
                                자세히 보기
                            </TouchableTypo>
                        </View>
                    </View>
                    <InfiniteLineChart yAxisSuffix={weightUnit} />
                    <ConfirmButton
                        text="몸무게 추가"
                        variant="outline"
                        size="small"
                        Icon={<Plus width={12} height={12} fill={color.Green[750].toString()} />}
                        onPress={on}
                    />
                </View>
            </ScrollView>
            <ConditionalRenderer
                condition={state}
                trueContent={
                    <Modal transparent={true}>
                        <BottomSheet onClose={off} snapInfo={{ pointsFromTop: [300], startIndex: 0 }}>
                            <View style={inputStyles.container}>
                                <View style={inputStyles.test}>
                                    <TextField label="무게" />
                                </View>
                                <View style={inputStyles.button}>
                                    <ConfirmButton text="등록" size="small" />
                                </View>
                            </View>
                        </BottomSheet>
                    </Modal>
                }
                falseContent={null}
            />
        </>
    );
}

const inputStyles = StyleSheet.create({
    container: {
        margin: 20,
        padding: 20,
        height: 135,
    },
    test: {
        flexDirection: 'row',
    },
    button: {
        marginLeft: 'auto',
        flexDirection: 'row',
        gap: 10,
    },
});

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
    wrapperContent: {
        paddingBottom: 160,
    },
    container: {
        padding: 20,
        marginBottom: 40,
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginBottom: 10,
    },
    hatchingContainer: {
        marginLeft: 'auto',
    },
    tagContainer: {
        flexDirection: 'row',
        gap: 5,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingLeft: 20,
        marginBottom: 10,
    },
    plusContainer: {
        backgroundColor: color.Teal[150].toString(),
        borderRadius: 9999,
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        height: 20,
    },
    weightDetailButtonContainer: {
        marginLeft: 'auto',
        marginRight: 20,
    },
});
