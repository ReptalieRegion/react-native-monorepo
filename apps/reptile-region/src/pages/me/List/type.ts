type SettingItem = {
    title: string;
    onPress?(): void;
    rightChildren: 'Chevron' | string;
};

type SettingList = {
    title: string;
    items: SettingItem[];
};

export type { SettingList };
