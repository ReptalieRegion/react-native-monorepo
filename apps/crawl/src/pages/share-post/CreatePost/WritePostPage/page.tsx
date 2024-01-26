import { Typo } from '@crawl/design-system';
import React, { useEffect } from 'react';
import { ActivityIndicator, Keyboard, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useCreatePostState from '../@common/context/useCreatePostState';

import { PhotoRegisterCarousel } from './components';
import ContentsWriting from './components/ContentWriting';
import useCreatePost from './hooks/mutations/useCreatePost';

import { ConditionalRenderer } from '@/components/@common/atoms';
import PageWrapper from '@/components/PageWrapper';
import withPageHeaderUpdate from '@/components/withPageHeaderUpdate';
import { useTag } from '@/pages/share-post/@common/contexts/TagTextInput';
import type { WritePostScreenProps } from '@/types/routes/props/share-post/create-post';

const FollowerUserList = React.lazy(
    () => import('@/pages/share-post/@common/contexts/TagTextInput/components/FollowerUserList'),
);

const WritePostPage = withPageHeaderUpdate<WritePostScreenProps>(
    () => {
        return (
            <PageWrapper style={styles.wrapper}>
                <ContentsWriting />
                <View style={styles.relative}>
                    <FollowerUserList containerStyles={styles.followerUserListContainer} />
                    <PhotoRegisterCarousel />
                </View>
            </PageWrapper>
        );
    },
    ({ navigation }) => {
        const { croppedImage } = useCreatePostState();
        const { contents } = useTag();
        const { isPending, mutate } = useCreatePost();

        useEffect(() => {
            const headerRight = () => {
                const isValidate = croppedImage.length === 0 || contents.length === 0;
                const handleSubmitSharePost = () => {
                    if (isValidate) {
                        return;
                    }

                    Keyboard.dismiss();
                    mutate({ contents, selectedPhotos: croppedImage });
                };

                return (
                    <ConditionalRenderer
                        condition={isPending}
                        trueContent={<ActivityIndicator />}
                        falseContent={
                            <TouchableOpacity
                                onPress={handleSubmitSharePost}
                                style={headerStyles.wrapper}
                                containerStyle={headerStyles.container}
                                disabled={isValidate}
                            >
                                <Typo color={isValidate ? 'placeholder' : 'default'} disabled={isValidate}>
                                    다음
                                </Typo>
                            </TouchableOpacity>
                        }
                    />
                );
            };

            navigation.setOptions({ headerRight });
        }, [navigation, contents, isPending, mutate, croppedImage]);

        return null;
    },
);

const styles = StyleSheet.create({
    wrapper: {
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

const headerStyles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        marginRight: -20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
});

export default WritePostPage;
