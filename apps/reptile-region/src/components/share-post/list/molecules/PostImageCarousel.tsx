import React from 'react';
import { StyleSheet } from 'react-native';
import * as Haptic from 'react-native-haptic-feedback';
import { shallow } from 'zustand/shallow';

import HeartAnimation from '../atoms/HeartAnimation';
import ImageContent from '../atoms/ImageContent';

import type { SharePostListData } from '<SharePostAPI>';
import useCreateLike from '@/apis/share-post/post/hooks/mutations/useCreateLike';
import useUpdateLike from '@/apis/share-post/post/hooks/mutations/useUpdateLike';
import DoubleTabView from '@/components/common/element/view/DoubleTabView';
import useSharePostListStore from '@/stores/share-post/useSharePostListStore';

type ImagesSliderProps = {
    post: Pick<SharePostListData['post'], 'images' | 'id' | 'isLike'>;
};

const PostImageCarousel = ({ post }: ImagesSliderProps) => {
    const { id: postId, images, isLike } = post;
    const { mutate: createMutate } = useCreateLike();
    const { mutate: updateMutate } = useUpdateLike();

    const { startLikeAnimation, setStartLikeAnimation } = useSharePostListStore(
        (state) => ({
            setStartLikeAnimation: state.setStartLikeAnimation,
            startLikeAnimation: state.postsOfInfo[post.id]?.startLikeAnimation,
        }),
        shallow,
    );

    const handleDoubleTabHeartAnimation = () => {
        setStartLikeAnimation(post.id, true);
        if (isLike === undefined) {
            createMutate({ postId });
        } else if (!isLike) {
            updateMutate({ postId });
        }

        Haptic.trigger('impactLight');
    };

    return (
        <DoubleTabView onDoubleTab={handleDoubleTabHeartAnimation} style={styles.container}>
            <ImageContent post={{ id: postId, images }} />
            {startLikeAnimation && <HeartAnimation post={{ id: postId }} />}
        </DoubleTabView>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
});

export default PostImageCarousel;
