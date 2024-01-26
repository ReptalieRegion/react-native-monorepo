import { withAsyncBoundary } from '@crawl/async-boundary';
import { Typo } from '@crawl/design-system';
import { FlashList, type ContentStyle, type ListRenderItem } from '@shopify/flash-list';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BlockUserListError from './error';
import useDeleteBlockUser from './hooks/useDeleteBlockUser';
import BlockUserListSkeleton from './loading';

import useInfiniteBlockUser from '@/apis/report/queries/useInfiniteBlockUser';
import Delete from '@/assets/icons/Delete';
import { Avatar, ConditionalRenderer } from '@/components/@common/atoms';
import useAlert from '@/components/overlay/Alert/useAlert';
import PageWrapper from '@/components/PageWrapper';
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
                                onPress: () => mutate({ blockingId: item.blocking.id, nickname: item.blocking.user.nickname }),
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
                <ConditionalRenderer
                    condition={data.length === 0}
                    trueContent={<Empty />}
                    falseContent={
                        <FlashList
                            data={data}
                            renderItem={renderItem}
                            contentContainerStyle={contentContainerStyle}
                            estimatedItemSize={70}
                        />
                    }
                />
            </PageWrapper>
        );
    },
    {
        pendingFallback: <BlockUserListSkeleton />,
        rejectedFallback: BlockUserListError,
    },
);

function Empty() {
    const { bottom } = useSafeAreaInsets();
    return (
        <View style={[styles.emptyWrapper, { paddingBottom: bottom }]}>
            <Typo variant="heading2" textAlign="center">
                차단한 사용자가 없어요
            </Typo>
        </View>
    );
}

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
    emptyWrapper: {
        flex: 1,
        justifyContent: 'center',
    },
});
