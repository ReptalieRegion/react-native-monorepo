import React from 'react';
import { ISharePostsData } from '<SharePostAPI>';
import sharePostListStore from '@/stores/share-post/list';
import { Platform, StyleSheet, Text, View } from 'react-native';

type ImagesIndicators = Pick<ISharePostsData, 'images' | 'postId'>;

const currentImage = {
    color: '#1E8B68FF',
    scale: {
        ios: 0.8,
        android: 1.3,
        windows: 1,
        macos: 1,
        web: 1,
    },
};

const otherImage = {
    color: '#808080',
    scale: {
        ios: 0.7,
        android: 1.2,
        windows: 1,
        macos: 1,
        web: 1,
    },
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
                    <Text key={index} style={{ color, transform: [{ scale: scale[Platform.OS] }] }}>
                        ●
                    </Text>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
});

export default ImagesIndicators;
