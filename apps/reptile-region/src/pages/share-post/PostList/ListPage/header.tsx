import { color } from '@crawl/design-system';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useFetchMeProfile from '@/apis/me/profile/hooks/queries/useFetchMeProfile';
import useFetchPushReadCheck from '@/apis/notification/push/hooks/queries/useFetchPushReadCheck';
import { NotificationIcon } from '@/assets/icons';
import { Avatar, ConditionalRenderer } from '@/components/@common/atoms';
import { createNativeStackHeader } from '@/components/@common/molecules';
import { useAuth } from '@/hooks/auth';
import useAuthNavigation from '@/hooks/auth/useNavigationAuth';
import type { SharePostListPageScreen } from '@/types/routes/props/share-post/post-list';

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
    const { data: pushRead } = useFetchPushReadCheck();
    const { data: profile } = useFetchMeProfile();

    useEffect(() => {
        const headerRight = () => {
            const handlePressNotification = () => {
                requireAuthNavigation(() => {
                    navigation.navigate('me/notification-log');
                });
            };

            const handlePressProfile = () => {
                navigation.navigate('share-post/modal', {
                    screen: 'modal/image-thumbnail/me',
                });
            };

            return (
                <View style={styles.rightContainer}>
                    <ConditionalRenderer
                        condition={isSignIn && pushRead?.isReadAllLog !== undefined && !pushRead.isReadAllLog}
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
                    <TouchableOpacity onPress={handlePressProfile}>
                        <Avatar image={profile?.user.profile} size={24} />
                    </TouchableOpacity>
                </View>
            );
        };

        navigation.setOptions({ headerRight });
    }, [isSignIn, navigation, profile?.user, pushRead?.isReadAllLog, requireAuthNavigation]);

    return null;
}

const styles = StyleSheet.create({
    rightContainer: {
        flexDirection: 'row',
        gap: 20,
    },
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
