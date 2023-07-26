import React from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import PostWriteIcon from '@/assets/icons/PostWriteIcon';
import { useNavigation } from '@react-navigation/native';
import { SharePostListNavigationProp } from '<Routes>';
import { color } from '@/components/common/tokens/colors';

const PostWrite = () => {
    const navigation = useNavigation<SharePostListNavigationProp>();
    const scale = new Animated.Value(1);

    const scaleDown = () => {
        Animated.timing(scale, {
            toValue: 0.85,
            duration: 1,
            useNativeDriver: true,
        }).start();
    };

    const scaleUp = () => {
        Animated.timing(scale, {
            toValue: 1,
            duration: 1,
            useNativeDriver: true,
        }).start();
    };

    const handleRouteImageCrop = () => {
        navigation.push('share-post/image-crop');
    };

    return (
        <Animated.View style={{ transform: [{ scale }] }}>
            <TouchableOpacity
                onPressIn={scaleDown}
                onPressOut={scaleUp}
                onPress={handleRouteImageCrop}
                style={styles.container}
                activeOpacity={1}
            >
                <PostWriteIcon />
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: 50,
        height: 50,
        backgroundColor: color.Teal[150].toString(),
        borderRadius: 9999,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PostWrite;
