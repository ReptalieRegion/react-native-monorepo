import { withAsyncBoundary } from '@crawl/async-boundary';
import { Typo, color } from '@crawl/design-system';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { LIST_HEADER_HEIGHT, LIST_HEADER_PADDING } from '../@common/constants';
import useImageThumbnailNavigation from '../@common/hooks/useImageThumbnailNavigation';
import SharePostsDetailListSkeleton from '../loading';

import ListHeaderComponent from './components/ListHeaderComponent';
import useUpdateOrCreateFollow from './hooks/useUpdateOrCreateFollow';

import { Warning } from '@/assets/icons';
import PageWrapper from '@/components/PageWrapper';
import type {
    SharePostImageThumbnailListModalScreenProps,
    SharePostImageThumbnailListScreenProps,
} from '@/types/routes/props/share-post/image-thumbnail';

const PostImageList = React.lazy(() => import('./components/PostImageList'));

const SharePostImageThumbnailListPage = withAsyncBoundary<
    SharePostImageThumbnailListModalScreenProps | SharePostImageThumbnailListScreenProps
>(
    ({
        route: {
            params: {
                pageState,
                user: { nickname },
            },
        },
    }) => {
        const { navigateFollowerPage, navigateListUser } = useImageThumbnailNavigation(pageState);
        const updateOrCreateFollow = useUpdateOrCreateFollow(nickname);
        const handleImagePress = (index: number) => {
            navigateListUser({ user: { nickname }, startIndex: index });
        };

        const MemoListHeaderComponent = useMemo(
            () => (
                <ListHeaderComponent
                    navigateFollowPage={navigateFollowerPage}
                    handlePressFollow={updateOrCreateFollow}
                    containerStyle={{
                        height: LIST_HEADER_HEIGHT,
                        padding: LIST_HEADER_PADDING,
                    }}
                />
            ),
            [navigateFollowerPage, updateOrCreateFollow],
        );

        return (
            <PageWrapper>
                <PostImageList
                    pageState={pageState}
                    nickname={nickname}
                    ListHeaderComponent={MemoListHeaderComponent}
                    handleImagePress={handleImagePress}
                />
            </PageWrapper>
        );
    },
    {
        rejectedFallback: () => (
            <PageWrapper style={errorStyle.wrapper}>
                <Warning width={50} height={50} fill={color.Orange[750].toString()} />
                <Typo variant="heading1">존재하지 않는 회원이예요</Typo>
            </PageWrapper>
        ),
        pendingFallback: (
            <PageWrapper>
                <ListHeaderComponent
                    navigateFollowPage={() => {}}
                    containerStyle={{
                        height: LIST_HEADER_HEIGHT,
                        padding: LIST_HEADER_PADDING,
                    }}
                />
                <SharePostsDetailListSkeleton />
            </PageWrapper>
        ),
    },
);

const errorStyle = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
});

export default SharePostImageThumbnailListPage;
