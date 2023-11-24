import React from 'react';

import useFetchPost from '@/apis/share-post/post/hooks/queries/useFetchPost';
import { Divider } from '@/components/@common/atoms/Divider';
import SharePostCardNotification from '@/components/share-post/organisms/SharePostCard/SharePostCardNotification';
import useSharePostActions from '@/hooks/share-post/actions/useSharePostActions';
import useSharePostModalNavigation from '@/hooks/share-post/navigation/useSharePostModalNavigation';

export function Post({ postId }: { postId: string }) {
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
    const { handleDoublePressImageCarousel, handlePressFollow, handlePressHeart } = useSharePostActions();
    const { handlePressComment, handlePressLikeContents, handlePressPostOptionsMenu, handlePressProfile, handlePressTag } =
        useSharePostModalNavigation();

    return (
        <>
            <SharePostCardNotification
                post={data.post}
                onPressHeart={() => handlePressHeart({ postId, isLike })}
                onDoublePressImageCarousel={() => handleDoublePressImageCarousel({ postId, isLike })}
                onPressFollow={() => handlePressFollow({ userId, isFollow })}
                onPressPostOptionsMenu={() =>
                    handlePressPostOptionsMenu({ post: { id: postId, contents, images, isMine, user: { id: userId } } })
                }
                onPressProfile={() => handlePressProfile({ isFollow, nickname, profile })}
                onPressComment={() => handlePressComment({ post: { id: postId } })}
                onPressLikeContents={() => handlePressLikeContents({ postId })}
                onPressTag={handlePressTag}
            />
            <Divider />
        </>
    );
}
