import type { CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TouchableTypo } from '@reptile-region/design-system';
import React, { useEffect } from 'react';
import { ActivityIndicator, Keyboard } from 'react-native';

import useCreatePost from '@/apis/share-post/post/hooks/mutations/useCreatePost';
import { ConditionalRenderer } from '@/components/@common/atoms';
import { createNativeStackHeader } from '@/components/@common/molecules';
import { usePhotoSelect } from '@/components/@common/organisms/CameraAlbum';
import { useTag } from '@/components/@common/organisms/TagTextInput';
import type { RootRoutesParamList } from '@/types/routes/param-list';
import type { PostingParamList } from '@/types/routes/param-list/sharePost';

type ChangeHeaderProps = {
    navigation: CompositeNavigationProp<
        NativeStackNavigationProp<PostingParamList, 'write'>,
        NativeStackNavigationProp<RootRoutesParamList>
    >;
};

export const WritePostHeader = createNativeStackHeader({
    leftIcon: 'back',
    title: '일상공유 등록',
});

export default function ChangeHeader({ navigation }: ChangeHeaderProps) {
    const { selectedPhotos } = usePhotoSelect();
    const { contents } = useTag();
    const { isPending, mutate } = useCreatePost({
        onSuccess: () => {
            navigation.navigate('bottom-tab/routes', {
                screen: 'tab',
                params: {
                    screen: 'share-post/routes',
                    params: {
                        screen: 'bottom-tab/list',
                    },
                },
            });
        },
    });

    useEffect(() => {
        const headerRight = () => {
            const handleSubmitSharePost = () => {
                if (selectedPhotos.length === 0 || contents.length === 0) {
                    return;
                }

                Keyboard.dismiss();
                mutate({ contents, selectedPhotos });
            };

            return (
                <ConditionalRenderer
                    condition={isPending}
                    trueContent={<ActivityIndicator />}
                    falseContent={
                        <TouchableTypo onPress={handleSubmitSharePost} disabled={isPending}>
                            등록
                        </TouchableTypo>
                    }
                />
            );
        };

        navigation.setOptions({ headerRight });
    }, [navigation, contents, isPending, selectedPhotos, mutate]);

    return null;
}
