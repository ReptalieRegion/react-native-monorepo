import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import useScaleDownAndUp from '../animated/useScaleDownAndUp';

import { BottomTabStackNavigationProp } from '<RootRoutes>';
import { FloatingActionButtonSize } from '<SharePostComponent>';
import { PostWriteIcon } from '@/assets/icons';
import { color } from '@/components/common/tokens/colors';

const PostWrite = ({ buttonSize }: FloatingActionButtonSize) => {
    const navigation = useNavigation<BottomTabStackNavigationProp>();
    const { scaleStyle, scaleDown, scaleUp } = useScaleDownAndUp();

    const handleRouteImageCrop = () => {
        navigation.navigate('bottom-tab-less', { screen: 'share-post/image-crop' });
    };

    return (
        <TouchableWithoutFeedback
            onPressIn={scaleDown}
            onPressOut={scaleUp}
            onPress={handleRouteImageCrop}
            containerStyle={styles.container}
        >
            <Animated.View style={scaleStyle}>
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
