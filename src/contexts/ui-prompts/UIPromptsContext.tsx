import React, { ReactNode, createContext, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { UIPromptsDefaultProps } from '<UIPrompts>';

interface UIPromptsContextProps {
    children: ReactNode;
}

interface UIPromptsContextValue {
    setUIPrompts: <Props>(props: SetUIPromptsListProps<Props>) => {
        uiPromptsOpen: () => void;
        uiPromptsClose: () => void;
    };
}

type UIPromptsState = {
    [key in UIPromptsType]: boolean;
};

type UIPromptsList = {
    [key in UIPromptsType]?: ReactNode;
};

type UIPromptsType = 'bottomSheet' | 'modal' | 'toast' | 'alert';

interface SetUIPromptsListProps<Props> {
    openType: UIPromptsType;
    props: Props;
    Component: (props: UIPromptsDefaultProps & Props) => React.JSX.Element;
}

const defaultValue: UIPromptsContextValue = {
    setUIPrompts: () => ({
        uiPromptsOpen: () => {},
        uiPromptsClose: () => {},
    }),
};

export const UIPromptsContext = createContext<UIPromptsContextValue>(defaultValue);

const UIPromptsContextComponent = ({ children }: UIPromptsContextProps) => {
    const uiPromptsListRef = useRef<UIPromptsList>({
        bottomSheet: undefined,
        modal: undefined,
        toast: undefined,
        alert: undefined,
    }).current;
    const [open, setOpen] = useState<UIPromptsState>({ bottomSheet: false, modal: false, toast: false, alert: false });

    defaultValue.setUIPrompts = <Props,>({ openType, props, Component }: SetUIPromptsListProps<Props>) => {
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
