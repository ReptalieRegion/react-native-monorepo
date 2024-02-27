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

import AdoptionDetailContent from './components/AdoptionDetailContent';
import { AdoptionDetailHeader } from './header';

import useSuspenseFetchAdoptionPost from '@/apis/adoption/hooks/queries/useSuspenseFetchAdoptionPost';
import LikeIcon from '@/components/Like';
import PageWrapper from '@/components/PageWrapper';
import type { AdoptionDetailPageScreen } from '@/types/routes/props/adoption/list';
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

    return (
        <PageWrapper style={styles.wrapper}>
            <AdoptionDetailHeader navigation={navigation} />
            <Animated.ScrollView
                ref={scrollViewRef}
                overScrollMode="never"
                onScroll={handleScroll}
                style={styles.scrollViewContent}
                contentContainerStyle={styles.scrollViewContentContainer}
                scrollEventThrottle={16}
            >
                <AnimatedImage source={{ uri: data.images[0].src }} style={[styles.imageWrapper, imageHeight, styles.image]} />
                <AdoptionDetailContent data={data} />
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
