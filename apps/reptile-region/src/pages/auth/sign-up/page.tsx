import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

import TextButton from '@/components/common/layouts/button/TextButton';
import { color } from '@/components/common/tokens/colors';

type MessageType = 'duplicateCheck' | 'address' | 'password' | 'input';

type Map = Array<{
    type: MessageType;
    label: string;
    require: boolean;
    placeholder: string;
}>;

const MAP: Map = [
    {
        type: 'duplicateCheck',
        label: '아이디',
        require: true,
        placeholder: '아이디를 입력해주세요.',
    },
    {
        type: 'duplicateCheck',
        label: '닉네임',
        require: true,
        placeholder: '닉네임을 입력해주세요.',
    },
    {
        type: 'password',
        label: '비밀번호',
        require: true,
        placeholder: '비밀번호를 입력해주세요.',
    },
    {
        type: 'password',
        label: '비밀번호 확인',
        require: true,
        placeholder: '비밀번호를 한번 더 입력해주세요.',
    },
    {
        type: 'input',
        label: '이름',
        require: true,
        placeholder: '이름을 입력해주세요.',
    },
];

const SignUpPage = () => {
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                style={styles.viewContainer}
                contentContainerStyle={[styles.viewContainer]}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView contentContainerStyle={[styles.container, styles.contentContainer]}>
                    {MAP.map((item) => {
                        switch (item.type) {
                            case 'duplicateCheck':
                                return (
                                    <View key={item.label} style={styles.itemContainer}>
                                        <Text style={styles.label}>
                                            {item.label}
                                            {item.require ? <Text style={styles.require}>{' *'}</Text> : null}
                                        </Text>
                                        <View style={styles.item}>
                                            <TextInput placeholder={item.placeholder} style={styles.textInput} />
                                            <TextButton text="중복 확인" textStyle={styles.buttonText} variant="filled" />
                                        </View>
                                    </View>
                                );
                            case 'password':
                                return (
                                    <View key={item.label} style={styles.itemContainer}>
                                        <Text style={styles.label}>
                                            {item.label}
                                            {item.require ? <Text style={styles.require}>{' *'}</Text> : null}
                                        </Text>
                                        <View style={styles.item}>
                                            <TextInput
                                                secureTextEntry
                                                placeholder={item.placeholder}
                                                style={styles.textInput}
                                            />
                                        </View>
                                    </View>
                                );
                            case 'input':
                                return (
                                    <View key={item.label} style={styles.itemContainer}>
                                        <Text style={styles.label}>
                                            {item.label}
                                            {item.require ? <Text style={styles.require}>{' *'}</Text> : null}
                                        </Text>
                                        <View style={styles.item}>
                                            <TextInput placeholder={item.placeholder} style={styles.textInput} />
                                        </View>
                                    </View>
                                );
                        }
                    })}
                    <TextButton text="가입하기" textStyle={styles.buttonText} variant="filled" />
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        padding: 20,
    },
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
    contentContainer: {
        gap: 20,
    },
    itemContainer: {
        height: 70,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    text: {
        color: color.White.toString(),
    },
    button: {
        backgroundColor: color.Teal[150].toString(),
    },
    buttonText: {
        fontSize: 12,
        lineHeight: 20,
    },
    label: {
        verticalAlign: 'middle',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 10,
        fontWeight: '500',
    },
    textInput: {
        flex: 1,
        minHeight: 40,
        height: 40,
        maxHeight: 40,
        fontSize: 14,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: color.Gray[500].toString(),
        padding: 10,
    },
    require: {
        color: color.Red[500].toString(),
    },
});

export default SignUpPage;
