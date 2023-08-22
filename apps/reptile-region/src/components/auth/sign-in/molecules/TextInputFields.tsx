import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Dimensions, StyleSheet, View } from 'react-native';
import { z } from 'zod';

import { UseFormDefaultValues } from '<HookForm>';
import TextField, { TextFieldProps } from '@/components/common/element/text-input/TextField';
import TextButton from '@/components/common/layouts/button/TextButton';
import { color } from '@/components/common/tokens/colors';

type InputKey = 'ID' | 'PASSWORD';

type InputInfoArray = Array<{ name: InputKey; textFieldProps: TextFieldProps }>;

const width = Dimensions.get('screen').width;

const INPUT_INFO: InputInfoArray = [
    {
        name: 'ID',
        textFieldProps: {
            label: '아이디',
        },
    },
    {
        name: 'PASSWORD',
        textFieldProps: {
            label: '비밀번호',
        },
    },
];

const signInSchema = z.object({
    ID: z.string().min(1, { message: '아이디를 입력해주세요.' }),
    PASSWORD: z.string().min(1, { message: '비밀번호를 입력해주세요.' }),
});

const TextInputFields = () => {
    const { control, handleSubmit } = useForm<UseFormDefaultValues<InputKey>>({
        defaultValues: {
            ID: '',
            PASSWORD: '',
        },
        resolver: zodResolver(signInSchema),
    });

    const handleSignInSubmit = (data: UseFormDefaultValues<InputKey>) => {
        console.log(data.ID, data.PASSWORD);
    };

    return (
        <View style={styles.container}>
            {INPUT_INFO.map(({ name, textFieldProps }) => (
                <Controller
                    key={name}
                    name={name}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <TextField
                            variant="standard"
                            size="small"
                            width="80%"
                            {...textFieldProps}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
            ))}
            <TextButton
                text="로그인"
                onPress={handleSubmit(handleSignInSubmit)}
                containerStyle={styles.textView}
                textStyle={styles.text}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 15,
    },
    textView: {
        width: width * 0.8,
        backgroundColor: color.Teal[150].toString(),
        borderRadius: 4,
        padding: 15,
        marginTop: 10,
    },
    text: {
        color: color.White.toString(),
        textAlign: 'center',
    },
});

export default TextInputFields;
