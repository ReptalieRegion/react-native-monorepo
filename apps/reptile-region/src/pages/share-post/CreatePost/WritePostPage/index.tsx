import type { CompositeNavigationProp, CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { TouchableTypo, color } from '@reptile-region/design-system';
import React, { Suspense, useEffect } from 'react';
import { ActivityIndicator, Keyboard, StyleSheet, View } from 'react-native';

import type { RootRoutesParamList, SharePostPostingParamList } from '<routes/root>';
import useCreatePost from '@/apis/share-post/post/hooks/mutations/useCreatePost';
import { ConditionalRenderer } from '@/components/@common/atoms';
import { createNativeStackHeader } from '@/components/@common/molecules';
import usePhotoSelect from '@/components/@common/organisms/CameraAlbum/hooks/usePhotoSelect';
import { FollowerUserList, FollowerUserListSkeleton, TagProvider, useTag } from '@/components/@common/organisms/TagTextInput';
import { ContentsWriting, PhotoRegisterCarousel } from '@/components/share-post/organisms/Posting';

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
    const { isPending, mutate } = useCreatePost({
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
};

export const WritePostHeader = createNativeStackHeader({
    leftIcon: 'back',
    title: '일상공유 등록',
});

export default function WritePostPage({ navigation }: WritePostScreenProps) {
    return (
        <TagProvider>
            <ChangeHeader navigation={navigation} />
            <View style={styles.container}>
                <ContentsWriting />
                <View style={styles.relative}>
                    <Suspense fallback={<FollowerUserListSkeleton />}>
                        <FollowerUserList containerStyles={styles.followerUserListContainer} />
                    </Suspense>
                    <PhotoRegisterCarousel />
                </View>
            </View>
        </TagProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.White.toString(),
        flex: 1,
        padding: 20,
    },
    relative: {
        position: 'relative',
        flex: 1,
    },
    followerUserListContainer: {
        flex: 1,
        marginBottom: 20,
        gap: 10,
    },
});
