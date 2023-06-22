import React, { ReactNode, createContext, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TUIPromptsDefaultProps } from '<UIPrompts>';

interface IUIPromptsContextProps {
    children: ReactNode;
}

interface IUIPromptsContextValue {
    setOpenList: <Props>(props: ISetOpenListProps<Props>) => {
        uiPromptsOpen: () => void;
        uiPromptsClose: () => void;
    };
}

type TUIPromptsState = {
    [key in TOpenType]: boolean;
};

type TUIPromptsList = {
    [key in TOpenType]?: ReactNode;
};

type TOpenType = 'bottomSheet' | 'modal' | 'toast' | 'alert';

interface ISetOpenListProps<Props> {
    openType: TOpenType;
    props: Props;
    Component: (props: TUIPromptsDefaultProps & Props) => React.JSX.Element;
}

const defaultValue: IUIPromptsContextValue = {
    setOpenList: () => ({
        uiPromptsOpen: () => {},
        uiPromptsClose: () => {},
    }),
};

export const UIPromptsContext = createContext<IUIPromptsContextValue>(defaultValue);

const UIPromptsContextComponent = ({ children }: IUIPromptsContextProps) => {
    const uiPromptsListRef = useRef<TUIPromptsList>({
        bottomSheet: undefined,
        modal: undefined,
        toast: undefined,
        alert: undefined,
    }).current;
    const [open, setOpen] = useState<TUIPromptsState>({ bottomSheet: false, modal: false, toast: false, alert: false });

    defaultValue.setOpenList = <Props,>({ openType, props, Component }: ISetOpenListProps<Props>) => {
        const uiPromptsOpen = () => {
            setOpen((state) => ({ ...state, [openType]: true }));
        };

        const uiPromptsClose = () => {
            setOpen((state) => ({ ...state, [openType]: false }));
        };

        uiPromptsListRef[openType] = <Component uiPromptsClose={uiPromptsClose} {...props} />;
        return { uiPromptsOpen, uiPromptsClose };
    };

    return (
        <UIPromptsContext.Provider value={defaultValue}>
            {children}
            {open.bottomSheet && <View style={[styles.basePosition, styles.bottomSheet]}>{uiPromptsListRef.bottomSheet}</View>}
            {open.modal && <View style={[styles.basePosition, styles.modal]}>{uiPromptsListRef.modal}</View>}
            {open.toast && <View style={[styles.basePosition, styles.toast]}>{uiPromptsListRef.toast}</View>}
            {open.alert && <View style={[styles.basePosition, styles.alert]}>{uiPromptsListRef.alert}</View>}
        </UIPromptsContext.Provider>
    );
};

const styles = StyleSheet.create({
    basePosition: {
        position: 'absolute',
    },
    bottomSheet: {
        zIndex: 100,
    },
    modal: {
        zIndex: 101,
    },
    toast: {
        zIndex: 102,
    },
    alert: {
        zIndex: 103,
    },
});

export default UIPromptsContextComponent;
