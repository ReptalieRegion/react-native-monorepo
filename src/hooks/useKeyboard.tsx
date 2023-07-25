import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

const useKeyboard = () => {
    const [isKeyboardShow, setIsKeyboardShow] = useState<boolean>(false);
    useEffect(() => {
        const openKeyboard = () => {
            setIsKeyboardShow(true);
        };

        const closeKeyboard = () => {
            setIsKeyboardShow(false);
        };

        const keyboardDidShow = Keyboard.addListener('keyboardDidShow', openKeyboard);
        const keyboardDidHide = Keyboard.addListener('keyboardDidHide', closeKeyboard);

        return () => {
            keyboardDidShow.remove();
            keyboardDidHide.remove;
        };
    }, []);
    return { isKeyboardShow };
};

export default useKeyboard;
