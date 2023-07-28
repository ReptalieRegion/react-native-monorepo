import React from 'react';
import { Image, ListRenderItemInfo, StyleSheet } from 'react-native';
import { PostsInfo } from '<SharePostAPI>';

type SquareImageProps = Pick<ListRenderItemInfo<PostsInfo>, 'item'> & { width: number };

const SquareImage = ({ item, width }: SquareImageProps) => {
    return (
        <Image
            source={{ uri: item.thumbnail.src, width: 100, height: 100 }}
            alt={item.thumbnail.alt}
            style={[styles.image, { width }]}
            resizeMode="cover"
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
