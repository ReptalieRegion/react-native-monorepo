import React from 'react';
import { StyleSheet } from 'react-native';
import { shallow } from 'zustand/shallow';

import HeartAnimation from '../atoms/HeartAnimation';
import ImageContent from '../atoms/ImageContent';

import { SharePostListData } from '<SharePostListAPI>';
import DoubleTabView from '@/components/common/element/view/DoubleTabView';
import useSharePostListStore from '@/stores/share-post/list';
import Haptic from '@/utils/webview-bridge/react-native/haptic/Haptic';

type ImagesSliderProps = Pick<SharePostListData, 'images' | 'postId'>;

const PostImageCarousel = ({ postId, images }: ImagesSliderProps) => {
    const { startLikeAnimation, setStartLikeAnimation } = useSharePostListStore(
        (state) => ({
            setStartLikeAnimation: state.setStartLikeAnimation,
            startLikeAnimation: state.postsOfInfo[postId]?.startLikeAnimation,
        }),
        shallow,
    );

    const handleDoubleTabHeartAnimation = () => {
        setStartLikeAnimation(postId, true);

        if (!startLikeAnimation) {
            Haptic.trigger({ type: 'impactLight' });
        }
    };

    return (
        <DoubleTabView onDoubleTab={handleDoubleTabHeartAnimation} style={styles.container}>
            <ImageContent images={images} postId={postId} />
            {startLikeAnimation && <HeartAnimation postId={postId} />}
        </DoubleTabView>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
});

export default PostImageCarousel;