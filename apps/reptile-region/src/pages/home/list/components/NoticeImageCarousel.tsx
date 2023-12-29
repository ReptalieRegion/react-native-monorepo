import { Typo, color } from '@crawl/design-system';
import { range } from 'lodash-es';
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

const data = range(5).map((_, index) => index);

export default function NoticeImageCarousel({ onPressIndicator }: NoticeImageCarouselProps) {
    const { width } = useWindowDimensions();
    const imageWidth = width - styles.wrapper.paddingHorizontal * 2;
    const cardStyle = { width: imageWidth, height: 220 };
    const itemStyle = [styles.itemWrapper, cardStyle];

    return (
        <View style={styles.wrapper}>
            <AutoImageCarousel
                data={data}
                keyExtractor={(item) => item.toString()}
                cardStyle={cardStyle}
                renderItem={({ index }) => (
                    <View style={itemStyle}>
                        <Typo>{index + 1}</Typo>
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
        marginVertical: 20,
        paddingHorizontal: 20,
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
