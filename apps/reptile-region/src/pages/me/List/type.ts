type SettingList = {
    title: string;
    items: {
        title: string;
        onPress?(): void;
        rightChildren: 'Chevron' | string;
        showSignIn: boolean;
    }[];
};

export type { SettingList };
