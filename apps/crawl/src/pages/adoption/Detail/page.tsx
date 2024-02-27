import { Typo, color } from '@crawl/design-system';
import { Image } from 'expo-image';
import React from 'react';
import {
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    View,
    type NativeScrollEvent,
    type NativeSyntheticEvent,
} from 'react-native';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import type { AnimatedScrollView } from 'react-native-reanimated/lib/typescript/reanimated2/component/ScrollView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useSuspenseFetchAdoptionPost from '@/apis/adoption/hooks/queries/useSuspenseFetchAdoptionPost';
import { BackButton, KebabMenu } from '@/assets/icons';
import { Avatar } from '@/components/@common/atoms';
import LikeIcon from '@/components/Like';
import PageWrapper from '@/components/PageWrapper';
import { HEADER_HEIGHT } from '@/constants/global';
import type { AdoptionDetailPageScreen } from '@/types/routes/props/adoption/list';
import { calculateTimeAgo } from '@/utils/date';
import { formatToGender } from '@/utils/format/formatToGender';
import { formatToKRW } from '@/utils/format/formatToKRW';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const { width: imageWidth } = Dimensions.get('screen');

export default function AdoptionDetailPage({
    navigation,
    route: {
        params: { adoptionId },
    },
}: AdoptionDetailPageScreen) {
    const scrollViewRef = useAnimatedRef<AnimatedScrollView>();
    const { top } = useSafeAreaInsets();
    const { data } = useSuspenseFetchAdoptionPost({ adoptionId });
    const scrollY = useSharedValue(0);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        scrollY.value = offsetY;
    };

    const imageHeight = useAnimatedStyle(() => {
        return {
            height: imageWidth,
            transform: [{ scale: interpolate(scrollY.value, [-imageWidth, 0], [3, 1], 'clamp') }],
        };
    });

    const navigateBack = () => {
        navigation.goBack();
    };

    return (
        <PageWrapper style={styles.wrapper}>
            <View style={[styles.headerWrapper, { paddingTop: top }]}>
                <TouchableOpacity onPress={navigateBack}>
                    <BackButton fill={color.White.toString()} width={30} height={30} />
                </TouchableOpacity>
                <KebabMenu fill={color.White.toString()} width={30} height={30} />
            </View>
            <Animated.ScrollView
                ref={scrollViewRef}
                overScrollMode="never"
                onScroll={handleScroll}
                style={styles.scrollViewContent}
                contentContainerStyle={styles.scrollViewContentContainer}
                scrollEventThrottle={16}
            >
                <AnimatedImage source={{ uri: data.images[0].src }} style={[styles.imageWrapper, imageHeight, styles.image]} />
                <View style={styles.profileWrapper}>
                    <Avatar image={data.user.profile} size={50} />
                    <View>
                        <Typo variant="title3">{data.user.nickname}</Typo>
                        <Typo variant="body3" color="placeholder">{`${data.location.sido} ${data.location.gungu}`}</Typo>
                    </View>
                </View>
                <View style={styles.contentWrapper}>
                    <Typo variant="title2">{data.title}</Typo>
                    <Typo variant="body4" color="placeholder">
                        {calculateTimeAgo(data.createdAt)}
                    </Typo>
                    <View style={styles.boxWrapper}>
                        <View style={[styles.paddingVertical, styles.borderBottom, styles.boxContainer]}>
                            <View style={styles.row}>
                                <View style={styles.boxWidth}>
                                    <Typo color="sub-placeholder">종</Typo>
                                </View>
                                <Typo>{`${data.variety.classification} / ${data.variety.species}`}</Typo>
                            </View>
                            <View style={styles.row}>
                                <View style={styles.boxWidth}>
                                    <Typo color="sub-placeholder">모프</Typo>
                                </View>
                                <Typo>{`${data.variety.detailedSpecies} / ${data.variety.morph?.join(' • ')}`}</Typo>
                            </View>
                        </View>
                        <View style={[styles.row, styles.gap, styles.paddingVertical]}>
                            <View style={styles.row}>
                                <View style={styles.boxWidth}>
                                    <Typo color="sub-placeholder">성별</Typo>
                                </View>
                                <Typo>{`${formatToGender(data.gender)}`}</Typo>
                            </View>
                            <View style={styles.row}>
                                <View style={styles.boxWidth}>
                                    <Typo color="sub-placeholder">크기</Typo>
                                </View>
                                <Typo>{`${data.size}`}</Typo>
                            </View>
                        </View>
                    </View>
                    <Typo>{data.content}</Typo>
                </View>
            </Animated.ScrollView>
            <View style={styles.buttonWrapper}>
                <LikeIcon isLike />
                <View style={styles.priceWrapper}>
                    <Typo variant="title3">{formatToKRW(data.price)}</Typo>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Typo color="surface">채팅하기</Typo>
                </TouchableOpacity>
            </View>
        </PageWrapper>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        paddingBottom: 20,
    },
    headerWrapper: {
        position: 'absolute',
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 20,
        height: HEADER_HEIGHT,
        justifyContent: 'space-between',
        zIndex: 20,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    scrollViewContentContainer: {
        flexGrow: 1,
        paddingTop: imageWidth,
    },
    priceWrapper: {
        flex: 1,
        paddingLeft: 10,
    },
    imageWrapper: {
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
    profileWrapper: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        gap: 10,
        borderBottomWidth: 1,
        borderBottomColor: color.Gray[200].toString(),
        backgroundColor: color.White.toString(),
        zIndex: 10,
    },
    contentWrapper: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: color.White.toString(),
        zIndex: 10,
    },
    boxWrapper: {
        backgroundColor: color.Gray[200].toString(),
        borderRadius: 10,
        paddingHorizontal: 10,
        gap: 5,
        marginVertical: 20,
    },
    boxContainer: {
        gap: 5,
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: color.Gray[500].toString(),
    },
    row: {
        flexDirection: 'row',
    },
    gap: {
        gap: 20,
    },
    paddingVertical: {
        paddingVertical: 10,
    },
    boxWidth: {
        width: 40,
    },
    buttonWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: color.Gray[200].toString(),
    },
    button: {
        backgroundColor: color.Teal[150].toString(),
        padding: 10,
        borderRadius: 10,
    },
});
