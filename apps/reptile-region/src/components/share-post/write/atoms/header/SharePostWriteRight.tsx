import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { shallow } from 'zustand/shallow';

import useCreatePost from '@/apis/share-post/post/hooks/mutations/useCreatePost';
import useSharePostWriteStore from '@/stores/share-post/write';

const SharePostWriteRightHeader = () => {
    const { selectedPhotos, contents } = useSharePostWriteStore(
        (state) => ({
            selectedPhotos: state.selectedPhotos,
            contents: state.contents,
        }),
        shallow,
    );
    const { isLoading, mutate } = useCreatePost();

    const handleSubmitSharePost = () => {
        if (selectedPhotos.length === 0 || contents.length === 0) {
            return;
        }

        const files = selectedPhotos.map((photo) => ({
            uri: photo.node.image.uri,
            name: photo.node.image.filename ?? '',
            type: 'image/jpeg',
        }));
        mutate({ contents, files });
    };

    return (
        <TouchableOpacity onPress={handleSubmitSharePost} disabled={isLoading}>
            <Text>등록</Text>
        </TouchableOpacity>
    );
};

export default SharePostWriteRightHeader;
