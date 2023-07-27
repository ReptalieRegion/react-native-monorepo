import React from 'react';
import { StyleSheet } from 'react-native';
import { shallow } from 'zustand/shallow';
import sharePostListStore from '@/stores/share-post/list';
import DoubleTabView from '@/components/common/element/view/DoubleTabView';
import Haptic from '@/utils/webview-bridge/react-native/haptic/Haptic';
import HeartAnimation from '../atoms/HeartAnimation';
import ImageContent from '../atoms/ImageContent';
import { SharePostsData } from '<SharePostAPI>';

type ImagesSliderProps = Pick<SharePostsData, 'images' | 'postId'>;

const PostImageCarousel = ({ postId, images }: ImagesSliderProps) => {
    const { startLikeAnimation, setStartLikeAnimation } = sharePostListStore(
        (state) => ({
            setStartLikeAnimation: state.setStartLikeAnimation,
            startLikeAnimation: state.postsOfInfo[postId]?.startLikeAnimation,
        }),
        shallow,
    );

    const handleDoubleTabHeartAnimation = () => {
        setStartLikeAnimation(postId, true);

        if (!startLikeAnimation) {
            Haptic.trigger({
                type: 'impactLight',
                options: { enableVibrateFallback: true, ignoreAndroidSystemSettings: false },
            });
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
