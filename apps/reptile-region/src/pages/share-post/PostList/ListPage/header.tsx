import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { color } from '@reptile-region/design-system';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import type { SharePostListPageScreen } from '../type';

import useFetchPushReadCheck from '@/apis/notification/push/hooks/queries/useFetchPushReadCheck';
import { NotificationIcon } from '@/assets/icons';
import { ConditionalRenderer } from '@/components/@common/atoms';
import { createNativeStackHeader } from '@/components/@common/molecules';
import { useAuth } from '@/components/auth/organisms/Auth/hooks/useAuth';
import useAuthNavigation from '@/hooks/@common/useNavigationAuth';

export function SharePostListHeader(props: NativeStackHeaderProps) {
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

export default function ChangeHeader({ navigation }: SharePostListPageScreen) {
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
        height: 5,
        width: 5,
        top: 1,
        right: 4,
    },
});
