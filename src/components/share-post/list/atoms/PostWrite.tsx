import React from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import PostWriteIcon from '@/assets/icons/PostWriteIcon';
import { useNavigation } from '@react-navigation/native';
import { SharePostListNavigationProp } from '<Routes>';
import { color } from '@/components/common/tokens/colors';
import { FloatingActionButtonSize } from '<SharePostComponent>';
import useScaleDownAndUp from '../animated/useScaleDownAndUp';

const PostWrite = ({ buttonSize }: FloatingActionButtonSize) => {
    const navigation = useNavigation<SharePostListNavigationProp>();
    const { scale, scaleDown, scaleUp } = useScaleDownAndUp();

    const handleRouteImageCrop = () => {
        navigation.push('share-post/image-crop');
    };

    return (
        <TouchableWithoutFeedback
            onPressIn={scaleDown}
            onPressOut={scaleUp}
            onPress={handleRouteImageCrop}
            style={styles.container}
        >
            <Animated.View style={{ transform: [{ scale }] }}>
                <View style={[buttonSize, styles.content]}>
                    <PostWriteIcon />
                </View>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.Teal[150].toString(),
        borderRadius: 9999,
    },
});

export default PostWrite;
