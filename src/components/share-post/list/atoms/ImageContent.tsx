import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ISharePostsData, TImage } from '<SharePostAPI>';

type IImagesContentProps = Pick<ISharePostsData, 'images'> & { onTab: () => void };
const { width } = Dimensions.get('screen');

const RenderItem = ({ src, alt, onTab }: TImage & { onTab: () => void }) => {
    return (
        <TouchableOpacity onPress={onTab} activeOpacity={1}>
            <Image source={{ uri: src }} alt={alt} style={[styles.image]} resizeMode="cover" />
        </TouchableOpacity>
    );
};

const ImageContent = ({ images, onTab }: IImagesContentProps) => {
    return (
        <FlatList
            data={images}
            keyExtractor={(item, index) => item.src + index.toString()}
            renderItem={(info) => <RenderItem {...info.item} onTab={onTab} />}
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
