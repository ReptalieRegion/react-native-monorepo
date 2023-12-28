import { Typo, color } from '@crawl/design-system';
import React, { Suspense } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import EntityList from './components/EntityList';
import NewSharePost from './components/NewSharePost';
import NoticeImageCarousel from './components/NoticeImageCarousel';
import ChangeHeader from './header';

import type { HomeListPageScreenProp } from '@/types/routes/props/home/list';

const gap = 10;
const marginHorizontal = gap / 2;

export default function HomeListPage(props: HomeListPageScreenProp) {
    const { width } = useWindowDimensions();
    const imageWidth = width / 2 - 40;
    const offset = styles.title.paddingHorizontal - marginHorizontal;

    return (
        <>
            <ChangeHeader {...props} />
            <ScrollView style={styles.wrapper} contentContainerStyle={styles.contentContainer}>
                <NoticeImageCarousel />
                <View style={styles.container}>
                    <View>
                        <View style={styles.title}>
                            <Typo variant="title2">최근 일상 🔥</Typo>
                            <Typo variant="title4" color="primary">
                                전체보기
                            </Typo>
                        </View>
                        <Suspense fallback={<></>}>
                            <NewSharePost
                                carouselProps={{
                                    gap,
                                    offset,
                                    marginHorizontal,
                                    width: imageWidth,
                                    height: 200,
                                }}
                            />
                        </Suspense>
                    </View>
                    <View>
                        <View style={styles.title}>
                            <Typo variant="title2">개체 관리 🦎</Typo>
                            <Typo variant="title4" color="primary">
                                전체보기
                            </Typo>
                        </View>
                        <Suspense fallback={<></>}>
                            <EntityList
                                carouselProps={{
                                    gap,
                                    offset,
                                    marginVertical: marginHorizontal,
                                    marginHorizontal,
                                    width: imageWidth,
                                    height: imageWidth,
                                }}
                            />
                        </Suspense>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
    contentContainer: {
        paddingBottom: 40,
    },
    container: {
        gap: 40,
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    imageBorder: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
});
