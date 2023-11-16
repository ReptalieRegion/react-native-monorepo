import messaging from '@react-native-firebase/messaging';
import { Typo, color } from '@reptile-region/design-system';
import { useToggle } from '@reptile-region/react-hooks';
import React, { useEffect, useState } from 'react';
import { AppState, Linking, StyleSheet, View } from 'react-native';
import { Switch } from 'react-native-gesture-handler';

import { ConditionalRenderer } from '@/components/@common/atoms';
import ListItem from '@/components/@common/molecules/ListItem/Item';

export default function NotificationSetting() {
    const [isEnabledPost, postToggle] = useToggle();
    const [isEnabledComment, commentToggle] = useToggle();
    const [isEnabledFollow, followToggle] = useToggle();
    const [isEnabledAnnouncement, announcementToggle] = useToggle();
    const [notNotificationPermission, setNotNotificationPermission] = useState(true);

    useEffect(() => {
        const notificationPermissionCheck = async () => {
            const notificationPermission = await messaging().hasPermission();
            setNotNotificationPermission(notificationPermission !== messaging.AuthorizationStatus.AUTHORIZED);
        };

        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'active') {
                notificationPermissionCheck();
            }
        });

        notificationPermissionCheck();
        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <View style={styles.container}>
            <ConditionalRenderer
                condition={notNotificationPermission}
                trueContent={
                    <View style={styles.list}>
                        <ListItem
                            leftChildren={<ListItem.Title text="기기 알림이 꺼져있어요." />}
                            rightChildren={<ListItem.Chevron />}
                            onPress={Linking.openSettings}
                        />
                    </View>
                }
                falseContent={null}
            />
            <View style={styles.list}>
                <Typo variant="title3">일상공유</Typo>
                <View style={styles.switchContainer}>
                    <Typo variant="body2">게시물 알림</Typo>
                    <Switch
                        value={isEnabledPost}
                        onValueChange={postToggle}
                        trackColor={{ true: color.Teal[150].toString() }}
                    />
                </View>
                <View style={styles.switchContainer}>
                    <Typo variant="body2">댓글 알림</Typo>
                    <Switch
                        value={isEnabledComment}
                        onValueChange={commentToggle}
                        trackColor={{ true: color.Teal[150].toString() }}
                    />
                </View>
            </View>
            <View style={styles.list}>
                <Typo variant="title3">회원</Typo>
                <View style={styles.switchContainer}>
                    <Typo variant="body2">팔로우 알림</Typo>
                    <Switch
                        value={isEnabledFollow}
                        onValueChange={followToggle}
                        trackColor={{ true: color.Teal[150].toString() }}
                    />
                </View>
            </View>
            <View style={[styles.list, styles.lastList]}>
                <Typo variant="title3">서비스</Typo>
                <View style={styles.switchContainer}>
                    <Typo variant="body2">공지사항 알림</Typo>
                    <Switch
                        value={isEnabledAnnouncement}
                        onValueChange={announcementToggle}
                        trackColor={{ true: color.Teal[150].toString() }}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        gap: 15,
        marginBottom: 10,
        backgroundColor: color.White.toString(),
        padding: 20,
    },
    lastList: {
        flex: 1,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
