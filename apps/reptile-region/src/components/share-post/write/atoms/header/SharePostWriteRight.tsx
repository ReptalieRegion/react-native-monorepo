import { useNavigation } from '@react-navigation/native';
import { throttle } from 'lodash-es';
import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { shallow } from 'zustand/shallow';

import useSharePostWriteStore from '../../../../../stores/share-post/write';

import { BottomTabStackNavigationProp } from '<RootRoutes>';

const SharePostWriteRightHeader = () => {
    const navigate = useNavigation<BottomTabStackNavigationProp>();
    const { selectedPhotos, postContent } = useSharePostWriteStore(
        (state) => ({
            selectedPhotos: state.selectedPhotos,
            postContent: state.postContent,
        }),
        shallow,
    );

    const makeFormData = () => {
        const formData = new FormData();
        selectedPhotos.forEach((photo) => {
            const { uri, filename } = photo.node.image;
            formData.append('files', {
                uri,
                name: filename,
                type: 'image/jpeg',
            });
        });

        formData.append('content', postContent);

        return formData;
    };

    const handleSubmitSharePost = async () => {
        try {
            const start = new Date().getTime();
            const formData = makeFormData();

            fetch('http://localhost:3333/api/users/test', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    const end = new Date().getTime();
                    console.log(
                        `이미지개수: ${selectedPhotos.length}\n실행시간: ${end - start}ms\n내용: ${postContent}\ndata:${data}`,
                    );
                })
                .catch(() => console.log('error'));

            navigate.navigate('bottom-tab', { screen: 'bottom-tab/share-post/routes', params: { screen: 'share-post/list' } });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <TouchableOpacity onPress={throttle(handleSubmitSharePost, 5000)}>
            <Text>등록</Text>
        </TouchableOpacity>
    );
};

export default SharePostWriteRightHeader;
