import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

type CommentTemplateProps = {
    imageComponent: React.ReactNode;
    contentComponent: React.ReactNode;
};

export default function CommentTemplate({ imageComponent, contentComponent }: CommentTemplateProps) {
    return (
        <Animated.View style={styles.container} entering={FadeIn} exiting={FadeOut}>
            {imageComponent}
            <View style={styles.commentItemContent}>{contentComponent}</View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
        paddingTop: 10,
    },
    commentItemContent: {
        flexDirection: 'column',
        flex: 1,
        gap: 5,
    },
});
