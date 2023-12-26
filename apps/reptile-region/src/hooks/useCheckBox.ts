import { useCallback, useState } from 'react';

type UseCheckBoxState = {
    initialChecked?: boolean;
};

interface UseCheckBoxActions {
    onChangeChecked?(isChecked: boolean): void;
}

export type UseCheckBoxProps = UseCheckBoxState & UseCheckBoxActions;

export default function useCheckBox(props?: UseCheckBoxProps) {
    const [isChecked, setIsChecked] = useState(props?.initialChecked ?? false);

    const onPress = useCallback(() => {
        const reverseCheck = !isChecked;
        setIsChecked(reverseCheck);
        props?.onChangeChecked?.(reverseCheck);
    }, [isChecked, props]);

    return {
        isChecked,
        onPress,
    };
}
