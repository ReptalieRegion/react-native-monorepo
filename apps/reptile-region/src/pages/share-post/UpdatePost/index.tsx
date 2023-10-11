import { NativeStackHeaderProps, NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';

import { RootRoutesParamList } from '<routes/root>';
import { createNativeStackHeader } from '@/components/@common/molecules';
import { Message, MessageType } from '@/components/share-post/organisms/PostUpdate/components/PostUpdateList';
import PostUpdate from '@/components/share-post/organisms/PostUpdate/providers/PostUpdate';

type SharePostUpdateScreen = NativeStackScreenProps<RootRoutesParamList, 'share-post/post/update'>;

export function SharePostUpdateHeader(props: NativeStackHeaderProps) {
    return createNativeStackHeader({ leftIcon: 'cancel', title: '정보 수정' })(props);
}

export default function SharePostUpdatePage({
    navigation,
    route: {
        params: { post },
    },
}: SharePostUpdateScreen) {
    const [newImages, setNewImages] = useState([...post.images]);
    const newData: Message[] = [
        { images: newImages, type: MessageType.Images },
        { text: post.contents, type: MessageType.Contents },
    ];

    const handleSubmit = () => {};

    const handleChangeHeaderRight = (headerRight: () => React.JSX.Element) => {
        navigation.setOptions({ headerRight });
    };

    const handleDeleteImage = (src: string) => {
        if (newImages.length === 1) {
            console.log('이미지는 최소 1개이어야 합니다.');
            return;
        }

        setNewImages((state) => state.filter((image) => image.src !== src));
    };

    return (
        <PostUpdate>
            <PostUpdate.List
                data={newData}
                onChangeHeaderRight={handleChangeHeaderRight}
                onSubmit={handleSubmit}
                onDeleteImage={handleDeleteImage}
            />
        </PostUpdate>
    );
}
