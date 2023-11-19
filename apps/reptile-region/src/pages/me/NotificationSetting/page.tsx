import messaging from '@react-native-firebase/messaging';
import { Typo, color } from '@reptile-region/design-system';
import React, { useEffect, useState } from 'react';
import { AppState, Linking, StyleSheet, View } from 'react-native';
import { Switch } from 'react-native-gesture-handler';

import type { FetchPushAgree, PushAgreeType, UpdatePushAgree } from '<api/my/notification>';
import useUpdatePushAgree from '@/apis/notification/push/hooks/mutations/useUpdatePushAgree';
import useFetchPushAgree from '@/apis/notification/push/hooks/queries/useFetchPushAgree';
import { ConditionalRenderer } from '@/components/@common/atoms';
import ListItem from '@/components/@common/molecules/ListItem/Item';

type ListType = {
    title: string;
    listItem: ListItemType[];
};

type ListItemType = {
    type: PushAgreeType;
    label: string;
    dataTarget: keyof FetchPushAgree['Response'];
};

const PUSH_AGREE_LIST: ListType[] = [
    {
        title: '일상공유',
        listItem: [
            {
                type: '좋아요',
                label: '게시물 좋아요 알림',
                dataTarget: 'isAgreePostLike',
            },
            {
                type: '댓글',
                label: '댓글 알림',
                dataTarget: 'isAgreeComment',
            },
        ],
    },
    {
        title: '회원',
        listItem: [
            {
                type: '팔로우',
                label: '팔로우 알림',
                dataTarget: 'isAgreeFollow',
            },
        ],
    },
    {
        title: '서비스',
        listItem: [
            {
                type: '공지사항',
                label: '공지사항 알림',
                dataTarget: 'isAgreeService',
            },
        ],
    },
];

export default function NotificationSetting() {
    const { data } = useFetchPushAgree();
    const { mutate } = useUpdatePushAgree();
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

    const updatePushNotification = ({ type, isAgree }: UpdatePushAgree['Request']) => {
        mutate({ type, isAgree });
    };

    return (
        <View style={styles.container}>
            <ConditionalRenderer
                condition={notNotificationPermission}
                trueContent={
                    <View style={styles.list}>
                        <ListItem
                            style={listStyles}
                            leftChildren={<ListItem.Title text="기기 알림이 꺼져있어요." />}
                            rightChildren={<ListItem.Chevron />}
                            onPress={Linking.openSettings}
                        />
                    </View>
                }
                falseContent={null}
            />

            {PUSH_AGREE_LIST.map(({ title, listItem }, index) => (
                <View style={[styles.list, index === PUSH_AGREE_LIST.length - 1 ? styles.lastList : undefined]} key={title}>
                    <Typo variant="title3">{title}</Typo>
                    <View>
                        {listItem.map(({ label, type, dataTarget }) => (
                            <ListItem
                                key={type}
                                style={listStyles}
                                leftChildren={<ListItem.Title text={label} disabled={notNotificationPermission} />}
                                rightChildren={
                                    <Switch
                                        value={data?.[dataTarget]}
                                        onValueChange={(isAgree) => updatePushNotification({ type, isAgree })}
                                        trackColor={{ true: color.Teal[150].toString() }}
                                        disabled={notNotificationPermission}
                                    />
                                }
                            />
                        ))}
                    </View>
                </View>
            ))}
        </View>
    );
}

const listStyles = {
    paddingLeft: 0,
    paddingTop: 4,
    paddingBottom: 4,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        marginBottom: 10,
        backgroundColor: color.White.toString(),
        padding: 20,
        gap: 10,
    },
    lastList: {
        flex: 1,
    },
});
