import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { color } from 'design-system';
import { Image } from 'expo-image';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { shallow } from 'zustand/shallow';

import PhotoLimit from '../ui-prompts/toast/PhotoLimit';

import { useUIPrompts } from '@/contexts/ui-prompts/UIPrompts';
import usePhotoStore from '@/stores/share-post/usePhotoStore';

interface ImageContentProps {
    item: PhotoIdentifier;
    numColumns: number;
    index: number;
}

const selectedImage = {
    backgroundColor: color.Green['750'].toString(),
    borderColor: color.Green['750'].toString(),
};

const otherSelectedImage = {
    backgroundColor: color.Gray['350'].alpha(0.66).toString(),
    borderColor: color.White.toString(),
};

const makeImageCircleStyles = (selectedNumber: number) => {
    const isSelectedPhoto = selectedNumber !== -1;
    return {
        styles: isSelectedPhoto ? selectedImage : otherSelectedImage,
        text: isSelectedPhoto ? selectedNumber + 1 : '',
    };
};

const currentSelectedImage = {
    opacity: 0.5,
};

const otherImages = {
    opacity: 1,
};

const makeImageStyles = (isCurrentSelectedImage: boolean) => {
    return isCurrentSelectedImage ? currentSelectedImage : otherImages;
};

const ImageContent = ({ item, numColumns }: ImageContentProps) => {
    const { setUIPrompts } = useUIPrompts();
    const {
        isCurrentSelectedPhoto,
        selectedNumber,
        changeCurrentSelectedPhoto,
        getImageState,
        deleteSelectedPhoto,
        addSelectedPhoto,
    } = usePhotoStore(
        (state) => ({
            changeCurrentSelectedPhoto: state.changeCurrentSelectedPhoto,
            deleteSelectedPhoto: state.deleteSelectedPhoto,
            getImageState: state.getImageState,
            addSelectedPhoto: state.addSelectedPhoto,
            isCurrentSelectedPhoto:
                state.selectedPhotos.length !== 0 && state.currentSelectedPhoto?.node.image.uri === item.node.image.uri,
            selectedNumber: state.findSelectedPhoto(item.node.image.uri),
        }),
        shallow,
    );

    const imageCircleStyles = makeImageCircleStyles(selectedNumber);
    const imageStyles = makeImageStyles(isCurrentSelectedPhoto);
    const imageWidth = Dimensions.get('window').width / numColumns - 2;

    const handleImageClick = () => {
        const imageURI = item.node.image.uri;
        const imageState = getImageState(imageURI);

        switch (imageState) {
            case 'add':
                addSelectedPhoto(item);
                return;
            case 'change':
                changeCurrentSelectedPhoto(item);
                return;
            case 'delete':
                deleteSelectedPhoto(imageURI);
                return;
            case 'limit':
                const { uiPromptsOpen } = setUIPrompts({ openType: 'toast', props: {}, Component: PhotoLimit });
                uiPromptsOpen();
                return;
        }
    };

    return (
        <TouchableOpacity onPress={handleImageClick}>
            <View style={[styles.container, { height: imageWidth, width: imageWidth }]}>
                <View style={[styles.circle, imageCircleStyles.styles]}>
                    <Text style={styles.text}>{imageCircleStyles.text}</Text>
                </View>
                <Image
                    recyclingKey={item.node.image.uri}
                    style={[styles.image, imageStyles, { height: imageWidth, width: imageWidth }]}
                    source={{ uri: item.node.image.uri }}
                    placeholder={require('@/assets/images/default_image.png')}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        margin: 1,
        flexDirection: 'column',
    },
    circle: {
        position: 'absolute',
        top: 5,
        right: 5,
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 9999,
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        color: color.White.toString(),
    },
    image: {
        position: 'absolute',
    },
});

export default ImageContent;
