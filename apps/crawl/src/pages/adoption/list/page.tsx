import { Typo, color } from '@crawl/design-system';
import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { Image } from 'expo-image';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import useSuspenseInfiniteAdoption from '@/apis/adoption/hooks/queries/useSuspenseInfiniteAdoption';
import { PostWriteIcon, UpArrow } from '@/assets/icons';
import GenderIcon from '@/components/@common/molecules/GenderIcon/GenderIcon';
import FloatingActionButtonGroup from '@/components/@common/organisms/FloatingActionButtons/components/FloatingActionButtonGroup';
import useFloatingHandler from '@/components/@common/organisms/FloatingActionButtons/hooks/useFloatingHandler';
import PageWrapper from '@/components/PageWrapper';
import useAuthNavigation from '@/hooks/auth/useNavigationAuth';
import useFlashListScroll from '@/hooks/useFlashListScroll';
import type { AdoptionPost } from '@/types/apis/adoption';
import type { AdoptionListPageScreen } from '@/types/routes/props/adoption/list';
import { calculateTimeAgo } from '@/utils/date';
import { formatToKRW } from '@/utils/format/formatToKRW';

export default function AdoptionListPage({ navigation }: AdoptionListPageScreen) {
    const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useSuspenseInfiniteAdoption({});
    /** Floating 관련 액션 시작 */
    const { secondaryIconDownAnimation, secondaryIconUpAnimation } = useFloatingHandler();
    const { requireAuthNavigation } = useAuthNavigation();

    const handlePressPrimaryFloatingButton = () => {
        requireAuthNavigation(() => {
            navigation.navigate('share-post/modal/posting', {
                screen: 'image-crop',
            });
        });
    };

    // FlashList 스크롤 관련 함수
    const { flashListRef, determineScrollDirection, scrollToTop } = useFlashListScroll<AdoptionPost>({
        onScrollDown: secondaryIconDownAnimation,
        onScrollUp: secondaryIconUpAnimation,
    });

    const renderItem: ListRenderItem<AdoptionPost> = useCallback(({ item }) => {
        return (
            <View style={styles.itemWrapper}>
                <Image source={{ uri: item.images[0].src }} style={styles.imageSize} recyclingKey={item.images[0].src} />
                <View style={styles.itemContentWrapper}>
                    <Typo variant="title4" numberOfLines={2}>
                        {item.title}
                    </Typo>
                    <Typo variant="body3" color="placeholder">
                        {`${item.location.sido} ${item.location.gungu} • ${calculateTimeAgo(item.createdAt)}`}
                    </Typo>
                    <Typo variant="title4">{formatToKRW(item.price)}</Typo>
                    <View style={styles.tagContentWrapper}>
                        <View style={styles.tag}>
                            <Typo variant="body3" color="sub-placeholder">
                                {item.size}
                            </Typo>
                        </View>
                        <GenderIcon gender={item.gender} size={14} />
                    </View>
                </View>
            </View>
        );
    }, []);

    const handleEndReached = useCallback(
        () => hasNextPage && !isFetchingNextPage && fetchNextPage(),
        [fetchNextPage, hasNextPage, isFetchingNextPage],
    );

    return (
        <PageWrapper>
            <FlashList
                ref={flashListRef}
                data={data}
                renderItem={renderItem}
                estimatedItemSize={180}
                onEndReached={handleEndReached}
                scrollEventThrottle={16}
                onScroll={determineScrollDirection}
            />
            <FloatingActionButtonGroup position={floatingPosition}>
                <FloatingActionButtonGroup.Button
                    name="primary"
                    Icon={PostWriteIcon}
                    iconStyle={primaryIcon}
                    onPress={handlePressPrimaryFloatingButton}
                />
                <FloatingActionButtonGroup.Button
                    name="secondary"
                    Icon={UpArrow}
                    iconStyle={secondaryIcon}
                    onPress={scrollToTop}
                />
            </FloatingActionButtonGroup>
        </PageWrapper>
    );
}

/** Floating 관련 스타일 시작 */
const floatingPosition = {
    right: 70,
    bottom: 70,
};

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

const styles = StyleSheet.create({
    itemWrapper: {
        width: '100%',
        padding: 20,
        flexDirection: 'row',
        gap: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: color.Gray[200].toString(),
    },
    itemContentWrapper: {
        flex: 1,
        gap: 5,
    },
    tagContentWrapper: {
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    imageSize: {
        borderRadius: 10,
        width: 100,
        height: 100,
    },
    tag: {
        backgroundColor: color.Gray[200].toString(),
        paddingVertical: 2,
        paddingHorizontal: 4,
        borderRadius: 4,
    },
});
