import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useCreatePost from '@/apis/share-post/post/hooks/mutations/useCreatePost';
import usePhotoStore from '@/stores/share-post/usePhotoStore';
import useUserTaggingStore from '@/stores/share-post/useUserTaggingStore';

const SharePostWriteRightHeader = () => {
    const selectedPhotos = usePhotoStore((state) => state.selectedPhotos);
    const contents = useUserTaggingStore((state) => state.contentsInfo.contents);
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
