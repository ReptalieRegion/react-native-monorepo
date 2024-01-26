import { Typo, color } from '@crawl/design-system';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import AutoImageCarousel from '@/components/@common/molecules/AutoImageCarousel/AutoImageCarousel';
import type { HomeListPageNavigationProp } from '@/types/routes/props/home/list';

interface NoticeImageCarouselActions {
    onPressImage?(): void;
    onPressIndicator?(): void;
}

type NoticeImageCarouselProps = NoticeImageCarouselActions;

type ListData = {
    key: string;
    source: any;
    onPress(): void;
};

export default function NoticeImageCarousel({ onPressIndicator }: NoticeImageCarouselProps) {
    const navigation = useNavigation<HomeListPageNavigationProp>();
    const { width } = useWindowDimensions();
    const cardStyle = { width: width, height: 200 };
    const itemStyle = [styles.itemWrapper, cardStyle];
    const data: ListData[] = [
        {
            key: '크롤 오픈 축하 공지사항',
            source: require('@/assets/images/notice_open.png'),
            onPress: () => {
                navigation.navigate('homepage');
            },
        },
    ];

    return (
        <View style={styles.wrapper}>
            <AutoImageCarousel
                data={data}
                keyExtractor={(item) => item.toString()}
                cardStyle={cardStyle}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={item.onPress}>
                        <View style={itemStyle}>
                            <Image key={item.key} source={item.source} style={itemStyle} contentFit="cover" />
                        </View>
                    </TouchableOpacity>
                )}
                renderIndicator={(currentIndex) => (
                    <TouchableWithoutFeedback style={styles.indicatorWrapper} onPress={onPressIndicator}>
                        <Typo variant="body4" color="surface" textAlign="right">
                            {currentIndex + 1} / {data.length}
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
    },
});
