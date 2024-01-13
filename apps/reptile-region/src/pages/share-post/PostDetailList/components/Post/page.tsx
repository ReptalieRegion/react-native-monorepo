import { useNavigation } from '@react-navigation/native';
import React from 'react';

import usePostOptionsMenuBottomSheet from '../../../@common/bottom-sheet/PostOptionsMenu/usePostOptionsMenuBottomSheet';
import useSharePostNavigation from '../../../@common/hooks/useSharePostNavigation';
import usePostDetailActions from '../../hooks/usePostDetailActions';

import useFetchPost from '@/apis/share-post/post/hooks/queries/useFetchPost';
import { Divider } from '@/components/@common/atoms/Divider';
import SharePostCard from '@/pages/share-post/PostDetailList/components/Post/SharePostCard';

type PostProps = {
    postId: string;
};

export default function Post({ postId }: PostProps) {
    const { data } = useFetchPost({ postId });
    const {
        post: {
            contents,
            images,
            isLike,
            isMine,
            user: { id: userId, isFollow, nickname, profile },
        },
    } = data;
    const { onlyLike, updateOrCreateFollow, updateOrCreateLike } = usePostDetailActions({ postId });
    const { navigateComment, handlePressLikeContents, navigateImageThumbnail, handlePressTag } =
        useSharePostNavigation('MODAL');
    const openPostOptionsMenuBottomSheet = usePostOptionsMenuBottomSheet();

    const navigation = useNavigation();
    const navigationBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    return (
        <>
            <SharePostCard
                post={data.post}
                onPressHeart={() => updateOrCreateLike({ postId, isLike })}
                onDoublePressImageCarousel={() => onlyLike({ postId, isLike })}
                onPressFollow={() => updateOrCreateFollow({ userId, isFollow })}
                onPressPostOptionsMenu={() =>
                    openPostOptionsMenuBottomSheet({
                        post: { id: postId, contents, images, isMine, user: { id: userId, nickname } },
                        onSuccessDelete: navigationBack,
                    })
                }
                onPressProfile={() => navigateImageThumbnail({ user: { isFollow, nickname, profile } })}
                onPressComment={() => navigateComment({ post: { id: postId } })}
                onPressLikeContents={() => handlePressLikeContents({ post: { id: postId } })}
                onPressTag={handlePressTag}
            />
            <Divider />
        </>
    );
}
