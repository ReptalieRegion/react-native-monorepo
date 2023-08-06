import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

const useKeyboard = () => {
    const [isKeyboardWillShow, setIsKeyboardWillShow] = useState<boolean>(false);
    const [isKeyboardShow, setIsKeyboardShow] = useState<boolean>(false);
    const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

    useEffect(() => {
        const openKeyboard = (event: KeyboardEvent) => {
            setKeyboardHeight(event.endCoordinates.height);
            setIsKeyboardShow(true);
        };

        const closeKeyboard = () => {
            setKeyboardHeight(0);
            setIsKeyboardShow(false);
        };

        const willOpenKeyboard = () => {
            setIsKeyboardWillShow(true);
        };

        const keyboardWillShow = Keyboard.addListener('keyboardWillShow', willOpenKeyboard);
        const keyboardDidShow = Keyboard.addListener('keyboardDidShow', openKeyboard);
        const keyboardDidHide = Keyboard.addListener('keyboardDidHide', closeKeyboard);

        return () => {
            keyboardWillShow.remove();
            keyboardDidShow.remove();
            keyboardDidHide.remove();
        };
    }, []);
    return { isKeyboardShow, isKeyboardWillShow, keyboardHeight };
};

export default useKeyboard;
