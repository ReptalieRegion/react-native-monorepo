import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import InteractiveHeart from '../contexts/SharePostCard/components/InteractiveHeart';

import { Comment } from '@/assets/icons';
import { ImageCarousel } from '@/components/@common/organisms/ImageCarousel';

type InteractiveState = {
    isLike: boolean | undefined;
    imageCount: number;
};

interface InteractiveActions {
    onPressHeart(): void;
    onPressComment(): void;
}

type InteractiveProps = InteractiveState & InteractiveActions;

export default function InteractivePost({ isLike, imageCount, onPressHeart, onPressComment }: InteractiveProps) {
    return (
        <View style={[styles.container, styles.flexRow]}>
            <View style={[styles.flexRow, styles.likeCommentContent]}>
                <InteractiveHeart isLike={isLike} onPress={onPressHeart} />
                <TouchableOpacity onPress={onPressComment}>
                    <Comment />
                </TouchableOpacity>
            </View>
            <ImageCarousel.Indicators imageCount={imageCount} />
            <View style={styles.empty} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    flexRow: {
        flexDirection: 'row',
    },
    likeCommentContent: {
        marginLeft: -5,
    },
    empty: {
        width: 80,
    },
});
