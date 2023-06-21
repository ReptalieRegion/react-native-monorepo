import React from 'react';
import { StyleSheet, View } from 'react-native';
import ImageEditor from '../atoms/ImageEditor';
import ImageList from '../molecules/ImageList';
import ImageContentHeader from '../atoms/ImageContentHeader';

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
    },
    contentContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
});

export default ImagePicker;
