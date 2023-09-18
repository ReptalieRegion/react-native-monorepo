import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { SharePostNavigationProp } from '<SharePostRoutes>';
import useCreatePost from '@/apis/share-post/post/hooks/mutations/useCreatePost';
import usePhotoStore from '@/stores/share-post/usePhotoStore';
import useUserTaggingStore from '@/stores/share-post/useUserTaggingStore';

const SharePostWriteRightHeader = () => {
    const navigate = useNavigation<SharePostNavigationProp<'share-post/modal/posting'>>();
    const selectedPhotos = usePhotoStore((state) => state.selectedPhotos);
    const contents = useUserTaggingStore((state) => state.contentsInfo.contents);
    const { isLoading, mutate } = useCreatePost({
        onSuccess: () => {
            navigate.navigate('share-post/list');
        },
    });

    const handleSubmitSharePost = () => {
        if (selectedPhotos.length === 0 || contents.length === 0) {
            return;
        }

        mutate({ contents, selectedPhotos });
    };

    return (
        <TouchableOpacity onPress={handleSubmitSharePost} disabled={isLoading}>
            <Text>등록</Text>
        </TouchableOpacity>
    );
};

export default SharePostWriteRightHeader;
