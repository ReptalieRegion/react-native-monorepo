import React from 'react';
import { ISharePostsData } from '<SharePostAPI>';
import sharePostListStore from '@/stores/share-post/list';
import { StyleSheet, View } from 'react-native';
import DotIndicator from '@/assets/icons/DotIndicator';

type ImagesIndicators = Pick<ISharePostsData, 'images' | 'postId'>;

const currentImage = {
    color: '#1E8B68FF',
    scale: 1,
};

const otherImage = {
    color: '#808080',
    scale: 0.9,
};

const makeIndicatorsInfo = (isCurrent: boolean) => {
    return isCurrent ? currentImage : otherImage;
};

const ImagesIndicators = ({ images, postId }: ImagesIndicators) => {
    const imageIndex = sharePostListStore((state) => state.postsOfInfo[postId]?.imageIndex);

    return (
        <View style={styles.container}>
            {images.map((_, index) => {
                const { color, scale } = makeIndicatorsInfo(index === imageIndex);
                return (
                    <View key={index} style={{ transform: [{ scale }] }}>
                        <DotIndicator fill={color} />
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
