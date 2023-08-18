import React from 'react';
import { StyleSheet, View } from 'react-native';

import ImageContentHeader from '../atoms/ImageContentHeader';
import ImageEditor from '../atoms/ImageEditor';
import ImageList from '../molecules/ImageList';

import { color } from '@/components/common/tokens/colors';

const ImagePicker = () => {
    return (
        <View style={styles.container}>
            <ImageEditor />
            <ImageContentHeader />
            <ImageList />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
    contentContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
});

export default ImagePicker;