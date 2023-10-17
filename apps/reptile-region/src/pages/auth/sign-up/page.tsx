import { Typo, color } from '@reptile-region/design-system';
import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

import { TextButton } from '@/components/@common/atoms';

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
                                        <View style={styles.label}>
                                            <Typo variant="title5">
                                                {item.label}
                                                {item.require ? (
                                                    <Typo variant="title5" color="require">
                                                        {' *'}
                                                    </Typo>
                                                ) : null}
                                            </Typo>
                                        </View>
                                        <View style={styles.item}>
                                            <TextInput placeholder={item.placeholder} style={styles.textInput} />
                                            <TextButton text="중복 확인" type="view" />
                                        </View>
                                    </View>
                                );
                            case 'password':
                                return (
                                    <View key={item.label} style={styles.itemContainer}>
                                        <Typo variant="title5">
                                            {item.label}
                                            {item.require ? (
                                                <Typo variant="title5" color="require">
                                                    {' *'}
                                                </Typo>
                                            ) : null}
                                        </Typo>
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
                                        <Typo variant="title5">
                                            {item.label}
                                            {item.require ? (
                                                <Typo variant="title5" color="require">
                                                    {' *'}
                                                </Typo>
                                            ) : null}
                                        </Typo>
                                        <View style={styles.item}>
                                            <TextInput placeholder={item.placeholder} style={styles.textInput} />
                                        </View>
                                    </View>
                                );
                            default:
                                return null;
                        }
                    })}
                    <TextButton text="가입하기" textInfo={{ variant: 'body4' }} type="view" />
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
        marginBottom: 10,
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
