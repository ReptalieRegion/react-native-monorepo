import { useCallback, useState } from 'react';

type UseCheckBoxState = {
    checked?: boolean;
};

export interface UseCheckBoxActions {
    onChangeChecked?(isChecked: boolean): void;
}

type UseCheckBoxProps = UseCheckBoxState & UseCheckBoxActions;

export default function useCheckBox(props?: UseCheckBoxProps) {
    const [isChecked, setIsChecked] = useState(props?.checked ?? false);

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
