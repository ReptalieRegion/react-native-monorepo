import TouchableTypo from 'design-system/lib/components/Text/TouchableTypo';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import AlbumPicker from './AlbumPicker';

const ImageContentHeader = () => {
    return (
        <View style={styles.container}>
            <AlbumPicker />
            <View style={styles.view}>
                <TouchableTypo>카메라</TouchableTypo>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
    },
    view: {
        display: 'flex',
        flexDirection: 'row',
    },
    text: {
        fontWeight: '600',
    },
});

export default ImageContentHeader;
