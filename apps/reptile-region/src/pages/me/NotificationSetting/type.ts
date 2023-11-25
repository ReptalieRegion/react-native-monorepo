import type { FetchPushAgree, PushAgreeType } from '@/types/apis/notification';

type PushAgreeListItemType = {
    type: PushAgreeType;
    label: string;
    dataTarget: keyof FetchPushAgree['Response'];
};

type PushAgreeListType = {
    title: string;
    listItem: PushAgreeListItemType[];
};

export type { PushAgreeListType };
