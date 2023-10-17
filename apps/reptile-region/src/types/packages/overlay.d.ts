declare module 'overlay' {
    type ToastParam = {
        text: string;
        containerStyle?: Pick<ViewStyle, 'backgroundColor'>;
        textStyle?: Pick<TextStyle, 'color'>;
    };

    type OverlayList = {
        toast: ToastParam;
    };
}
