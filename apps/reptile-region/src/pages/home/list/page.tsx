import { Typo, color } from '@crawl/design-system';
import { ErrorBoundary } from '@crawl/error-boundary';
import React, { Suspense } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import EntityList from './components/EntityList';
import NewSharePost from './components/NewSharePost';
import NoticeImageCarousel from './components/NoticeImageCarousel';
import ChangeHeader from './header';
import EntityListSkeleton from './loading/EntitySkeleton';
import SharePostSkeleton from './loading/SharePostSkeleton';

import type { HomeListPageScreenProp } from '@/types/routes/props/home/list';

const gap = 10;
const marginHorizontal = gap / 2;
const sharePostHeight = 250;

export default function HomeListPage(props: HomeListPageScreenProp) {
    const { width } = useWindowDimensions();
    const imageWidth = width / 2 - 40;
    const offset = styles.title.paddingHorizontal - marginHorizontal;

    const navigateSharePost = () => {
        props.navigation.navigate('bottom-tab/routes', {
            screen: 'tab',
            params: {
                screen: 'share-post/routes',
                params: {
                    screen: 'bottom-tab/list',
                },
            },
        });
    };

    const navigateDiary = () => {
        props.navigation.navigate('bottom-tab/routes', {
            screen: 'tab',
            params: {
                screen: 'diary/routes',
                params: {
                    screen: 'entity-manager',
                    params: {
                        screen: 'entity-manager/list',
                    },
                },
            },
        });
    };

    return (
        <>
            <ChangeHeader {...props} />
            <ScrollView style={styles.wrapper} contentContainerStyle={styles.contentContainer}>
                <NoticeImageCarousel />
                <View style={styles.container}>
                    <View>
                        <View style={styles.title}>
                            <Typo variant="title2">최근 일상 🔥</Typo>
                            <TouchableOpacity onPress={navigateSharePost}>
                                <Typo variant="title3" color="primary">
                                    전체보기
                                </Typo>
                            </TouchableOpacity>
                        </View>
                        <Suspense fallback={<SharePostSkeleton width={imageWidth} height={sharePostHeight} offset={offset} />}>
                            <NewSharePost
                                carouselProps={{
                                    gap,
                                    offset,
                                    marginHorizontal,
                                    width: imageWidth,
                                    height: sharePostHeight,
                                }}
                            />
                        </Suspense>
                    </View>
                    <ErrorBoundary renderFallback={() => <Typo>hi</Typo>}>
                        <View>
                            <View style={styles.title}>
                                <Typo variant="title2">개체 관리 🦎</Typo>
                                <TouchableOpacity onPress={navigateDiary}>
                                    <Typo variant="title3" color="primary">
                                        전체보기
                                    </Typo>
                                </TouchableOpacity>
                            </View>
                            <Suspense
                                fallback={
                                    <EntityListSkeleton
                                        width={imageWidth}
                                        height={imageWidth}
                                        offset={offset}
                                        marginVertical={marginHorizontal}
                                    />
                                }
                            >
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
                    </ErrorBoundary>
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
        gap: 30,
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
