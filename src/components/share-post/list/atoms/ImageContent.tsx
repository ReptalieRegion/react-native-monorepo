import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet } from 'react-native';
import { ISharePostsData, TImage } from '<SharePostAPI>';

type IImagesContentProps = Pick<ISharePostsData, 'images'>;
const { width } = Dimensions.get('screen');

const RenderItem = ({ src, alt }: TImage) => {
    return <Image source={{ uri: src }} alt={alt} style={[styles.image]} resizeMode="cover" />;
};

const ImageContent = ({ images }: IImagesContentProps) => {
    return (
        <FlatList
            data={images}
            keyExtractor={(item, index) => item.src + index.toString()}
            renderItem={(info) => <RenderItem {...info.item} />}
            horizontal
            pinchGestureEnabled
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            overScrollMode="never"
            style={styles.content}
        />
    );
};

const styles = StyleSheet.create({
    content: {
        borderRadius: 6,
    },
    image: {
        minHeight: 250,
        width: width - 40,
    },
});

export default ImageContent;
