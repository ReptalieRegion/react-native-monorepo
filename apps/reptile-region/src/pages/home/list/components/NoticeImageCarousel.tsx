import { Typo, color } from '@crawl/design-system';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import AutoImageCarousel from '@/components/@common/molecules/AutoImageCarousel/AutoImageCarousel';

type NoticeImageCarouselState = {};

interface NoticeImageCarouselActions {
    onPressImage?(): void;
    onPressIndicator?(): void;
}

type NoticeImageCarouselProps = NoticeImageCarouselState & NoticeImageCarouselActions;

const data = [{ key: '크롤 오픈 축하 공지사항', source: require('@/assets/images/notice_open.png') }];

export default function NoticeImageCarousel({ onPressIndicator }: NoticeImageCarouselProps) {
    const { width } = useWindowDimensions();
    const cardStyle = { width: width, height: 190 };
    const itemStyle = [styles.itemWrapper, cardStyle];

    return (
        <View style={styles.wrapper}>
            <AutoImageCarousel
                data={data}
                keyExtractor={(item) => item.toString()}
                cardStyle={cardStyle}
                renderItem={({ item }) => (
                    <View style={itemStyle}>
                        <Image key={item.key} source={item.source} style={itemStyle} contentFit="cover" />
                    </View>
                )}
                renderIndicator={(currentIndex) => (
                    <TouchableWithoutFeedback style={styles.indicatorWrapper} onPress={onPressIndicator}>
                        <Typo variant="body4" color="surface" textAlign="right">
                            {currentIndex + 1} / {data.length} 전체보기
                        </Typo>
                    </TouchableWithoutFeedback>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 20,
    },
    itemWrapper: {
        backgroundColor: color.Gray[200].toString(),
        alignItems: 'center',
        justifyContent: 'center',
        height: 250,
    },
    indicatorWrapper: {
        position: 'absolute',
        backgroundColor: color.DarkGray[500].alpha(0.4).toString(),
        padding: 5,
        bottom: 0,
        right: 0,
        minWidth: 80,
    },
});
