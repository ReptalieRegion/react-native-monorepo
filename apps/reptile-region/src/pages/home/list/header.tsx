import { color } from '@crawl/design-system';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useFetchPushReadCheck from '@/apis/notification/push/hooks/queries/useFetchPushReadCheck';
import { NotificationIcon } from '@/assets/icons';
import { ConditionalRenderer } from '@/components/@common/atoms';
import { createNativeStackHeader } from '@/components/@common/molecules';
import { useAuth } from '@/hooks/auth';
import useAuthNavigation from '@/hooks/auth/useNavigationAuth';
import type { HomeListPageScreenProp } from '@/types/routes/props/home/list';

export function HomeListHeader(props: NativeStackHeaderProps) {
    const { requireAuthNavigation } = useAuthNavigation();
    const handlePressNotification = () => {
        requireAuthNavigation(() => {
            props.navigation.navigate('me/notification-log');
        });
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
    const { requireAuthNavigation } = useAuthNavigation();
    const { data } = useFetchPushReadCheck();

    useEffect(() => {
        const headerRight = () => {
            const handlePressNotification = () => {
                requireAuthNavigation(() => {
                    navigation.navigate('me/notification-log');
                });
            };

            return (
                <ConditionalRenderer
                    condition={!!isSignIn && data?.isReadAllLog !== undefined && !data.isReadAllLog}
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
    }, [data?.isReadAllLog, isSignIn, navigation, requireAuthNavigation]);

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
        borderWidth: 1,
        borderColor: color.White.toString(),
        height: 8,
        width: 8,
        top: 0,
        right: 1,
    },
});
