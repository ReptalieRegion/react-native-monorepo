import { CompositeNavigationProp, CompositeScreenProps } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { TouchableTypo } from 'design-system';
import React, { useEffect } from 'react';
import { ActivityIndicator, Keyboard } from 'react-native';

import { RootRoutesParamList, SharePostPostingParamList } from '<routes/root>';
import useCreatePost from '@/apis/share-post/post/hooks/mutations/useCreatePost';
import { ConditionalRenderer } from '@/components/@common/atoms';
import { createNativeStackHeader } from '@/components/@common/molecules';
import usePhotoSelect from '@/components/@common/organisms/CameraAlbum/hooks/usePhotoSelect';
import { TagProvider, useTag } from '@/components/@common/organisms/TagTextInput';
import SharePostWrite from '@/components/share-post/write/template/SharePostWrite';

type WritePostScreenProps = CompositeScreenProps<
    NativeStackScreenProps<SharePostPostingParamList, 'write'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

type ChangeHeaderProps = {
    navigation: CompositeNavigationProp<
        NativeStackNavigationProp<SharePostPostingParamList, 'write'>,
        NativeStackNavigationProp<RootRoutesParamList>
    >;
};

const ChangeHeader = ({ navigation }: ChangeHeaderProps) => {
    const { selectedPhotos } = usePhotoSelect();
    const { contents } = useTag();
    const { isLoading, mutate } = useCreatePost({
        onSuccess: () => {
            navigation.navigate('bottom-tab/routes', {
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
                    condition={isLoading}
                    trueContent={<ActivityIndicator />}
                    falseContent={
                        <TouchableTypo onPress={handleSubmitSharePost} disabled={isLoading}>
                            등록
                        </TouchableTypo>
                    }
                />
            );
        };

        navigation.setOptions({ headerRight });
    }, [navigation, contents, isLoading, selectedPhotos, mutate]);

    return null;
};

export const WritePostHeader = createNativeStackHeader({
    leftIcon: 'back',
    title: '일상공유 등록',
});

export default function WritePostPage({ navigation }: WritePostScreenProps) {
    return (
        <TagProvider>
            <ChangeHeader navigation={navigation} />
            <SharePostWrite />
        </TagProvider>
    );
}
