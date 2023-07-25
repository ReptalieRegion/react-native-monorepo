import React, { useContext } from 'react';
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { shallow } from 'zustand/shallow';
import SharePostStore from '@/stores/share-post';
import { UIPromptsContext } from '@/contexts/ui-prompts/UIPromptsContext';
import PhotoLimit from '../ui-prompts/toast/PhotoLimit';

interface IImageContentProps {
    item: PhotoIdentifier;
    numColumns: number;
    index: number;
}

interface IImageSelectCircle {
    uri: string;
}

const ImageSelectCircle = ({ uri }: IImageSelectCircle) => {
    const selectedNumber = SharePostStore((state) => state.findSelectedPhoto(uri));
    const styles = StyleSheet.create({
        circle: {
            position: 'absolute',
            top: 5,
            right: 5,
            width: 20,
            height: 20,
            backgroundColor: selectedNumber !== -1 ? '#006600' : '#D2D2D2AA',
            borderColor: selectedNumber !== -1 ? '#006600' : '#FFFFFF',
            borderWidth: 1,
            borderRadius: 9999,
            zIndex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            fontSize: 14,
            color: '#FFFFFF',
        },
    });
    return <View style={styles.circle}>{selectedNumber !== -1 && <Text style={styles.text}>{selectedNumber + 1}</Text>}</View>;
};

const ImageContent = ({ item, numColumns }: IImageContentProps) => {
    const { setOpenList } = useContext(UIPromptsContext);
    const { isCurrentPhoto, setSelectedPhotos, deleteSelectedPhotos } = SharePostStore(
        (state) => ({
            setSelectedPhotos: state.setSelectedPhotos,
            deleteSelectedPhotos: state.deleteSelectedPhotos,
            isCurrentPhoto:
                state.selectedPhotos.length !== 0 && state.currentSelectedPhoto?.node.image.uri === item.node.image.uri,
        }),
        shallow,
    );

    const imageWidth = Dimensions.get('window').width / numColumns - 2;
    const styles = StyleSheet.create({
        view: {
            position: 'relative',
            margin: 1,
            flexDirection: 'column',
            height: imageWidth,
            width: imageWidth,
        },
        image: {
            position: 'absolute',
            height: imageWidth,
            width: imageWidth,
            opacity: isCurrentPhoto ? 0.5 : 1,
        },
    });

    const handleImageClick = () => {
        if (isCurrentPhoto) {
            deleteSelectedPhotos(item.node.image.uri);
        } else {
            const message = setSelectedPhotos(item);
            if (message === 'limit') {
                const { uiPromptsOpen } = setOpenList({ openType: 'toast', props: {}, Component: PhotoLimit });
                uiPromptsOpen();
            }
        }
    };

    return (
        <View style={styles.view}>
            <TouchableOpacity onPress={handleImageClick}>
                <ImageSelectCircle uri={item.node.image.uri} />
                <Image style={styles.image} source={{ uri: item.node.image.uri }} />
            </TouchableOpacity>
        </View>
    );
};

export default ImageContent;
