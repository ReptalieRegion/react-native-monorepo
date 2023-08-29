import React from 'react';
import { StyleSheet } from 'react-native';
import { shallow } from 'zustand/shallow';

import HeartAnimation from '../atoms/HeartAnimation';
import ImageContent from '../atoms/ImageContent';

import type { SharePostListData } from '<SharePostAPI>';
import DoubleTabView from '@/components/common/element/view/DoubleTabView';
import useSharePostListStore from '@/stores/share-post/list';
import Haptic from '@/utils/webview-bridge/react-native/haptic/Haptic';

type ImagesSliderProps = {
    post: Pick<SharePostListData['post'], 'images' | 'id'>;
};

const PostImageCarousel = ({ post }: ImagesSliderProps) => {
    const { id: postId, images } = post;

    const { startLikeAnimation, setStartLikeAnimation } = useSharePostListStore(
        (state) => ({
            setStartLikeAnimation: state.setStartLikeAnimation,
            startLikeAnimation: state.postsOfInfo[post.id]?.startLikeAnimation,
        }),
        shallow,
    );

    const handleDoubleTabHeartAnimation = () => {
        setStartLikeAnimation(post.id, true);

        if (!startLikeAnimation) {
            Haptic.trigger({ type: 'impactLight' });
        }
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
