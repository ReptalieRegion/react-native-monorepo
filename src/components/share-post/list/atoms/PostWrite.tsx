import React from 'react';
import { Animated, Easing, StyleSheet, TouchableOpacity, View } from 'react-native';
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
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            duration: 150,
            useNativeDriver: true,
        }).start();
    };

    const scaleUp = () => {
        Animated.timing(scale, {
            toValue: 1,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            duration: 150,
            useNativeDriver: true,
        }).start();
    };

    const handleRouteImageCrop = () => {
        navigation.push('share-post/image-crop');
    };

    return (
        <TouchableOpacity
            onPressIn={scaleDown}
            onPressOut={scaleUp}
            onPress={handleRouteImageCrop}
            style={styles.container}
            activeOpacity={1}
        >
            <Animated.View style={{ transform: [{ scale }] }}>
                <View style={styles.content}>
                    <PostWriteIcon />
                </View>
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
    },
    content: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.Teal[150].toString(),
        borderRadius: 9999,
    },
});

export default PostWrite;
