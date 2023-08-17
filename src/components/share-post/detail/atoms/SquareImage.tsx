import React from 'react';
import { ListRenderItemInfo, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

import { PostsInfo } from '<SharePostDetail>';

type SquareImageProps = Pick<ListRenderItemInfo<PostsInfo>, 'item'> & { width: number };

const SquareImage = ({ item, width }: SquareImageProps) => {
    return (
        <FastImage
            source={{
                uri: item.thumbnail.src,
                priority: FastImage.priority.high,
                cache: FastImage.cacheControl.web,
            }}
            style={[styles.image, { width }]}
            resizeMode={FastImage.resizeMode.cover}
        />
    );
};

const styles = StyleSheet.create({
    image: {
        margin: 1,
        aspectRatio: '1/1',
    },
});

export default SquareImage;
