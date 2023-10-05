import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TouchableTypo } from 'design-system';
import React from 'react';
import { useTag } from 'tag-text-input';

import { RootRoutesParamList, SharePostPostingParamList } from '<RootRoutesV2>';
import useCreatePost from '@/apis/share-post/post/hooks/mutations/useCreatePost';
import usePhotoStore from '@/stores/share-post/usePhotoStore';

type PostWriteNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<SharePostPostingParamList, 'write'>,
    NativeStackNavigationProp<RootRoutesParamList>
>;

const SharePostWriteRightHeader = () => {
    const navigate = useNavigation<PostWriteNavigationProp>();
    const selectedPhotos = usePhotoStore((state) => state.selectedPhotos);
    const { contents } = useTag();
    const { isLoading, mutate } = useCreatePost({
        onSuccess: () => {
            navigate.navigate('bottom-tab/routes', {
                screen: 'tab',
                params: {
                    screen: 'share-post/routes',
                    params: {
                        screen: 'share-post/list',
                    },
                },
            });
        },
    });

    const handleSubmitSharePost = () => {
        if (selectedPhotos.length === 0 || contents.length === 0) {
            return;
        }

        mutate({ contents, selectedPhotos });
    };

    return (
        <TouchableTypo onPress={handleSubmitSharePost} disabled={isLoading}>
            등록
        </TouchableTypo>
    );
};

export default SharePostWriteRightHeader;
