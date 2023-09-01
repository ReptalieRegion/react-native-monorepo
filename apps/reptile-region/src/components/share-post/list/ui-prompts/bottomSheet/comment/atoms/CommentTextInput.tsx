import { Image } from 'expo-image';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import { color } from '@/components/common/tokens/colors';
import useKeyboard from '@/hooks/useKeyboard';

const CommentTextInput = () => {
    const { keyboardStyle } = useKeyboard();

    return (
        <Animated.View style={keyboardStyle}>
            <View style={styles.bottom}>
                <Image
                    style={styles.circle}
                    source={{
                        uri: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F009%2F2022%2F06%2F08%2F0004974574_002_20220608070201911.jpg&type=a340',
                    }}
                />
                <TextInput placeholder="댓글을 입력하세요..." style={styles.textInput} autoFocus multiline />
                <Text style={styles.submit}>등록</Text>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    bottom: {
        backgroundColor: color.White.toString(),
        padding: 8,
        borderTopColor: color.Gray[250].toString(),
        borderTopWidth: 0.5,
        width: Dimensions.get('screen').width,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    textInput: {
        padding: 10,
        width: (Dimensions.get('screen').width - 30 - 20) * 0.85,
        borderColor: color.Gray[250].toString(),
        borderWidth: 0.5,
        borderRadius: 20,
        height: 30,
        maxHeight: 100,
    },
    submit: {
        color: color.Green['750'].toString(),
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 9999,
    },
});

export default CommentTextInput;
