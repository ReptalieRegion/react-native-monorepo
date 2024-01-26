import { Typo, color } from '@crawl/design-system';
import { ErrorBoundary } from '@crawl/error-boundary';
import React, { Suspense, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import EntityList from './components/EntityList';
import NewSharePost from './components/NewSharePost';
import NoticeImageCarousel from './components/NoticeImageCarousel';
import EntityListError from './error/EntityListError';
import useCalcCarouselSize from './hooks/useCalcCarouselSize';
import useHomeListNavigation from './hooks/useHomeListNavigation';
import EntityListSkeleton from './loading/EntitySkeleton';
import SharePostSkeleton from './loading/SharePostSkeleton';

import useFetchPushReadCheck from '@/apis/notification/push/hooks/queries/useFetchPushReadCheck';
import { NotificationIcon } from '@/assets/icons';
import { ConditionalRenderer } from '@/components/@common/atoms';
import withPageHeaderUpdate from '@/components/withPageHeaderUpdate';
import { useAuth } from '@/hooks/auth';
import useAuthNavigation from '@/hooks/auth/useNavigationAuth';
import type { HomeListPageScreenProp } from '@/types/routes/props/home/list';

const HomeListPage = withPageHeaderUpdate<HomeListPageScreenProp>(
    () => {
        const { imageWidth, marginHorizontal, offset, sharePostHeight, gap } = useCalcCarouselSize();

        const { navigateDiary, navigateEntityDetail, navigateSharePost, navigationPostDetail } = useHomeListNavigation();

        return (
            <ScrollView
                style={styles.wrapper}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
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
                                navigationPostDetail={navigationPostDetail}
                            />
                        </Suspense>
                    </View>
                    <View>
                        <View style={styles.title}>
                            <Typo variant="title2">개체 관리 🦎</Typo>
                            <TouchableOpacity onPress={navigateDiary}>
                                <Typo variant="title3" color="primary">
                                    전체보기
                                </Typo>
                            </TouchableOpacity>
                        </View>
                        <ErrorBoundary renderFallback={(props) => <EntityListError {...props} onPress={navigateDiary} />}>
                            <Suspense fallback={<EntityListSkeleton />}>
                                <EntityList
                                    carouselProps={{
                                        gap,
                                        offset,
                                        marginVertical: marginHorizontal,
                                        marginHorizontal,
                                        width: imageWidth,
                                        height: imageWidth,
                                    }}
                                    navigateEntityDetail={navigateEntityDetail}
                                />
                            </Suspense>
                        </ErrorBoundary>
                    </View>
                </View>
            </ScrollView>
        );
    },
    ({ navigation }) => {
        const { isSignIn } = useAuth();
        const { requireAuthNavigation } = useAuthNavigation();
        const { data } = useFetchPushReadCheck();

        useEffect(() => {
            const headerRight = () => {
                const handlePressNotification = () => {
                    requireAuthNavigation(() => {
                        navigation.navigate('me/notification-log');
                    });
                };

                return (
                    <ConditionalRenderer
                        condition={!!isSignIn && data?.isReadAllLog !== undefined && !data.isReadAllLog}
                        trueContent={
                            <TouchableOpacity onPress={handlePressNotification}>
                                <View style={styles.container}>
                                    <NotificationIcon />
                                    <View style={styles.circle} />
                                </View>
                            </TouchableOpacity>
                        }
                        falseContent={
                            <TouchableOpacity onPress={handlePressNotification}>
                                <NotificationIcon />
                            </TouchableOpacity>
                        }
                    />
                );
            };

            navigation.setOptions({ headerRight });
        }, [data?.isReadAllLog, isSignIn, navigation, requireAuthNavigation]);

        return null;
    },
);

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
    circle: {
        backgroundColor: color.Red[500].toString(),
        position: 'absolute',
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: color.White.toString(),
        height: 8,
        width: 8,
        top: 0,
        right: 1,
    },
});

export default HomeListPage;
