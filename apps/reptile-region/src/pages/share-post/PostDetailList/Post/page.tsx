import React from 'react';

import useFetchPost from '@/apis/share-post/post/hooks/queries/useFetchPost';
import { Divider } from '@/components/@common/atoms/Divider';
import SharePostCardNotification from '@/components/share-post/organisms/SharePostCard/SharePostCardNotification';
import useSharePostActions from '@/hooks/share-post/actions/useSharePostActions';
import useSharePostNavigation from '@/hooks/share-post/navigation/useSharePostNavigation';

export function Post({ postId }: { postId: string }) {
    const { data } = useFetchPost({ postId });
    console.log(data);

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
    const { handlePressComment, handlePressLikeContents, handlePressPostOptionsMenu, handlePressProfile, handlePressTag } =
        useSharePostNavigation('MODAL');

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
                onPressProfile={() => handlePressProfile({ user: { isFollow, nickname, profile } })}
                onPressComment={() => handlePressComment({ post: { id: postId } })}
                onPressLikeContents={() => handlePressLikeContents({ post: { id: postId } })}
                onPressTag={handlePressTag}
            />
            <Divider />
        </>
    );
}
