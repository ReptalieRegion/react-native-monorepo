import React from 'react';
import { StyleSheet } from 'react-native';
import * as Haptic from 'react-native-haptic-feedback';
import { shallow } from 'zustand/shallow';

import HeartAnimation from '../atoms/HeartAnimation';
import ImageContent from '../atoms/ImageContent';

import type { ImageType } from '<image>';
import useCreateLike from '@/apis/share-post/post/hooks/mutations/useCreateLike';
import useUpdateLike from '@/apis/share-post/post/hooks/mutations/useUpdateLike';
import DoubleTabView from '@/components/common/element/view/DoubleTabView';
import useSharePostListStore from '@/stores/share-post/useSharePostListStore';

type ImagesSliderProps = {
    post: {
        id: string;
        images: ImageType[];
        isLike: boolean | undefined;
    };
};

const PostImageCarousel = ({ post: { id: postId, images, isLike } }: ImagesSliderProps) => {
    /** 비지니스 로직 시작 */
    const { mutate: createMutate } = useCreateLike();
    const { mutate: updateMutate } = useUpdateLike();

    const handleMutateLike = () => {
        if (isLike === undefined) {
            createMutate({ postId });
        } else if (!isLike) {
            updateMutate({ postId });
        }
    };
    /** 비지니스 로직 끝 */

    /** UI 로직 시작 */
    const { startLikeAnimation, setStartLikeAnimation } = useSharePostListStore(
        (state) => ({
            setStartLikeAnimation: state.setStartLikeAnimation,
            startLikeAnimation: state.postsOfInfo[postId]?.startLikeAnimation,
        }),
        shallow,
    );
    const handleDoubleTabHeartAnimation = () => {
        setStartLikeAnimation(postId, true);
        Haptic.trigger('impactLight');
    };
    /** UI 로직 끝 */

    const handleDoubleTab = () => {
        handleMutateLike();
        handleDoubleTabHeartAnimation();
    };

    return (
        <DoubleTabView onDoubleTab={handleDoubleTab} style={styles.container}>
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
