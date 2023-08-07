import React from 'react';
import { StyleSheet, View } from 'react-native';

import { SharePostListData } from '<SharePostAPI>';
import DotIndicator from '@/assets/icons/DotIndicator';
import { color } from '@/components/common/tokens/colors';
import sharePostListStore from '@/stores/share-post/list';

type ImagesIndicators = Pick<SharePostListData, 'images' | 'postId'>;

const currentImage = {
    color: color.Teal[150].toString(),
    scale: 1,
};

const otherImage = {
    color: color.Gray[500].toString(),
    scale: 0.9,
};

const makeIndicatorsStyles = (isCurrent: boolean) => {
    return isCurrent ? currentImage : otherImage;
};

const ImagesIndicators = ({ images, postId }: ImagesIndicators) => {
    const imageIndex = sharePostListStore((state) => state.postsOfInfo[postId]?.currentImageIndex);

    return (
        <View style={styles.container}>
            {images.map((_, index) => {
                const styles = makeIndicatorsStyles(index === imageIndex);
                return (
                    <View key={index} style={{ transform: [{ scale: styles.scale }] }}>
                        <DotIndicator fill={styles.color} />
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
