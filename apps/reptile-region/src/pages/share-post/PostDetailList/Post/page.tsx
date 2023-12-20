import React from 'react';

import usePostOptionsMenuBottomSheet from '../../@common/bottom-sheet/PostOptionsMenu/usePostOptionsMenuBottomSheet';

import useFetchPost from '@/apis/share-post/post/hooks/queries/useFetchPost';
import { Divider } from '@/components/@common/atoms/Divider';
import SharePostCardNotification from '@/components/share-post/organisms/SharePostCard/SharePostCardNotification';
import useSharePostActions from '@/pages/share-post/@common/hooks/useSharePostActions';
import useSharePostNavigation from '@/pages/share-post/PostList/@hooks/useSharePostNavigation';

export default function Post({ postId }: { postId: string }) {
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
    const { handleDoublePressImageCarousel, handlePressFollow, handlePressHeart } = useSharePostActions({
        type: 'POST_DETAIL',
        postId,
    });
    const { navigateComment, handlePressLikeContents, navigateImageThumbnail, handlePressTag } =
        useSharePostNavigation('MODAL');
    const openPostOptionsMenuBottomSheet = usePostOptionsMenuBottomSheet();

    return (
        <>
            <SharePostCardNotification
                post={data.post}
                onPressHeart={() => handlePressHeart({ postId, isLike })}
                onDoublePressImageCarousel={() => handleDoublePressImageCarousel({ postId, isLike })}
                onPressFollow={() => handlePressFollow({ userId, isFollow })}
                onPressPostOptionsMenu={() =>
                    openPostOptionsMenuBottomSheet({ post: { id: postId, contents, images, isMine, user: { id: userId } } })
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
