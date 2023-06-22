import React from 'react';
import { SharePostWritePageNavigationProp } from '<Routes>';
import SharePostStore from '@/stores/share-post';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity } from 'react-native';
import { shallow } from 'zustand/shallow';
import { throttle } from 'lodash-es';

const SharePostWriteRightHeader = () => {
    const navigate = useNavigation<SharePostWritePageNavigationProp>();
    const { selectedPhotos, postContent } = SharePostStore(
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
            console.log(filename);
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

            navigate.popToTop();
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
