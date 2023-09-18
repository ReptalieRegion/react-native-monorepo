import { zodResolver } from '@hookform/resolvers/zod';
import { color } from 'design-system';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Dimensions, StyleSheet, View } from 'react-native';
import { z } from 'zod';

import type { RequestSignIn } from '<AuthRequest>';
import type { UseFormDefaultValues } from '<HookForm>';
import { useSignIn } from '@/apis/auth/hooks';
import TextField, { TextFieldProps } from '@/components/common/element/text-input/TextField';
import TextButton from '@/components/common/layouts/button/TextButton';

type InputKey = 'EMAIL' | 'PASSWORD';

type InputInfoArray = Array<{ name: InputKey; textFieldProps: TextFieldProps }>;

const width = Dimensions.get('screen').width;

const INPUT_INFO: InputInfoArray = [
    {
        name: 'EMAIL',
        textFieldProps: {
            label: '아이디',
        },
    },
    {
        name: 'PASSWORD',
        textFieldProps: {
            label: '비밀번호',
            secureTextEntry: true,
        },
    },
];

const signInSchema = z.object({
    EMAIL: z.string().min(1, { message: '아이디를 입력해주세요.' }),
    PASSWORD: z.string().min(1, { message: '비밀번호를 입력해주세요.' }),
});

const TextInputFields = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<UseFormDefaultValues<InputKey>>({
        defaultValues: {
            EMAIL: '',
            PASSWORD: '',
        },
        resolver: zodResolver(signInSchema),
    });
    const { mutate } = useSignIn();
    const [focus, setFocus] = useState<InputKey>();

    useEffect(() => {
        setFocus('EMAIL');
    }, []);

    const handleSignInSubmit = (data: UseFormDefaultValues<InputKey>) => {
        const { EMAIL, PASSWORD } = data;
        const requestData: RequestSignIn = {
            userId: EMAIL,
            password: PASSWORD,
        };
        mutate(requestData);
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
                            errorMessage={errors[name]?.message}
                            autoFocus={focus === name}
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
        gap: 12,
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
