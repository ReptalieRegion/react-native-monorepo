type SettingList = {
    title: string;
    items: {
        title: string;
        onPress?(): void;
        rightChildren: 'Chevron' | string;
    }[];
};

export type { SettingList };
