import { withAsyncBoundary } from '@crawl/async-boundary';
import { color, Typo } from '@crawl/design-system';
import { FlashList, type ContentStyle, type ListRenderItem } from '@shopify/flash-list';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useDeleteBlockUser from './hooks/useDeleteBlockUser';
import BlockUserListSkeleton from './loading';

import useInfiniteBlockUser from '@/apis/report/queries/useInfiniteBlockUser';
import { Error } from '@/assets/icons';
import Delete from '@/assets/icons/Delete';
import { Avatar } from '@/components/@common/atoms';
import useAlert from '@/components/overlay/Alert/useAlert';
import PageWrapper from '@/components/PageWrapper';
import { 이메일_1대1문의 } from '@/env/constants';
import type { FetchBlockUserListResponse } from '@/types/apis/report/block-user';

export default withAsyncBoundary(
    () => {
        const { data } = useInfiniteBlockUser();
        const openAlert = useAlert();
        const { mutate } = useDeleteBlockUser();

        const renderItem: ListRenderItem<FetchBlockUserListResponse> = useCallback(
            ({ item }) => {
                const handlePressDelete = () => {
                    openAlert({
                        contents: '차단을 해제하시겠어요?',
                        buttons: [
                            {
                                text: '취소',
                                style: 'cancel',
                            },
                            {
                                text: '해제',
                                style: 'danger',
                                onPress: () => mutate({ blockingId: item.blocking.id }),
                            },
                        ],
                    });
                };

                return (
                    <View style={styles.itemWrapper}>
                        <Avatar image={item.blocking.user.profile} size={50} />
                        <Typo>{item.blocking.user.nickname}</Typo>
                        <View style={styles.actionWrapper}>
                            <TouchableOpacity onPress={handlePressDelete}>
                                <Delete width={30} height={30} />
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            },
            [mutate, openAlert],
        );

        const { bottom } = useSafeAreaInsets();
        const wrapperStyle = useMemo(() => ({ paddingBottom: bottom }), [bottom]);

        return (
            <PageWrapper style={wrapperStyle}>
                <FlashList
                    data={data}
                    renderItem={renderItem}
                    contentContainerStyle={contentContainerStyle}
                    estimatedItemSize={70}
                />
            </PageWrapper>
        );
    },
    {
        pendingFallback: <BlockUserListSkeleton />,
        rejectedFallback: () => (
            <View style={errorStyles.wrapper}>
                <Error width={70} height={70} fill={color.Red.A700.toString()} />

                <View style={errorStyles.textContainer}>
                    <Typo variant="heading1" textAlign="center">
                        {'알 수 없는 이유로' + '\n차단 목록을 불러올 수 없습니다.'}
                    </Typo>
                    <Typo variant="body4" textAlign="center">
                        {'이용에 불편을 드려 죄송합니다.\n'}
                        <Typo variant="title6">{이메일_1대1문의}</Typo>
                        으로 문의해 주세요.
                    </Typo>
                </View>
            </View>
        ),
    },
);

const contentContainerStyle: ContentStyle = {
    padding: 20,
};

const styles = StyleSheet.create({
    itemWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20,
    },
    actionWrapper: {
        marginLeft: 'auto',
    },
});

const errorStyles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        backgroundColor: color.White.toString(),
    },
    textContainer: {
        alignItems: 'center',
        gap: 20,
    },
});
