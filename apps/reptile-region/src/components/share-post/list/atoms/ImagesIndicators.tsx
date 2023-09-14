import { color } from 'design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import type { SharePostListData } from '<SharePostAPI>';
import { DotIndicator } from '@/assets/icons';
import useSharePostListStore from '@/stores/share-post/useSharePostListStore';

type ImagesIndicatorsProps = {
    post: Pick<SharePostListData['post'], 'images' | 'id'>;
};

const CURRENT_IMAGE = {
    color: color.Teal[150].toString(),
    scale: 1,
};

const OTHER_IMAGE = {
    color: color.Gray[500].toString(),
    scale: 0.9,
};

const makeIndicatorsStyles = (isCurrent: boolean) => {
    return isCurrent ? CURRENT_IMAGE : OTHER_IMAGE;
};

const ImagesIndicators = ({ post }: ImagesIndicatorsProps) => {
    const { id: postId, images } = post;

    const imageIndex = useSharePostListStore((state) => state.postsOfInfo[postId]?.currentImageIndex ?? 0);

    return (
        <View style={styles.container}>
            {images.map((_, index) => {
                const indicatorsStyle = makeIndicatorsStyles(index === imageIndex);

                return (
                    <View key={index} style={{ transform: [{ scale: indicatorsStyle.scale }] }}>
                        <DotIndicator fill={indicatorsStyle.color} />
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1,
    },
});

export default ImagesIndicators;
