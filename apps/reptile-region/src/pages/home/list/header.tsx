import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { color } from '@reptile-region/design-system';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import type { HomeListPageScreenProp } from './type';

import useFetchPushReadCheck from '@/apis/notification/push/hooks/queries/useFetchPushReadCheck';
import { NotificationIcon } from '@/assets/icons';
import { ConditionalRenderer } from '@/components/@common/atoms';
import { createNativeStackHeader } from '@/components/@common/molecules';
import { useAuth } from '@/components/auth/organisms/Auth/hooks/useAuth';

export function HomeListHeader(props: NativeStackHeaderProps) {
    const handlePressNotification = () => {
        props.navigation.navigate('me/notification-log');
    };

    return createNativeStackHeader({
        leftIcon: 'logo',
        right: (
            <TouchableOpacity onPress={handlePressNotification}>
                <NotificationIcon />
            </TouchableOpacity>
        ),
    })(props);
}

export default function ChangeHeader({ navigation }: HomeListPageScreenProp) {
    const { isSignIn } = useAuth();
    const { data } = useFetchPushReadCheck();

    useEffect(() => {
        const headerRight = () => {
            const handlePressNotification = () => {
                navigation.navigate('me/notification-log');
            };

            return (
                <ConditionalRenderer
                    condition={isSignIn && data?.isReadAllLog !== undefined && !data.isReadAllLog}
                    trueContent={
                        <TouchableOpacity onPress={handlePressNotification}>
                            <View style={styles.container}>
                                <NotificationIcon />
                                <View style={styles.circle} />
                            </View>
                        </TouchableOpacity>
                    }
                    falseContent={
                        <TouchableOpacity onPress={handlePressNotification}>
                            <NotificationIcon />
                        </TouchableOpacity>
                    }
                />
            );
        };

        navigation.setOptions({ headerRight });
    }, [data?.isReadAllLog, isSignIn, navigation]);

    return null;
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    circle: {
        backgroundColor: color.Red[500].toString(),
        position: 'absolute',
        borderRadius: 9999,
        height: 10,
        width: 10,
        top: 0,
        right: 3,
    },
});
