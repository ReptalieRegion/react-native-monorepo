import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';

export const enum SwipeState {
    Start = 0,
    End = 1,
}

export default function useSwipePage<ParamListBase extends {}>() {
    const [isSwipeStart, setIsSwipeStart] = useState(false);
    const swipeState = useSharedValue(1);
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    useEffect(() => {
        const transitionStart = navigation.addListener('transitionStart', () => {
            swipeState.value = SwipeState.Start;
            setIsSwipeStart(true);
        });

        const transitionEnd = navigation.addListener('transitionEnd', () => {
            swipeState.value = SwipeState.End;
            setIsSwipeStart(false);
        });

        return () => {
            transitionStart();
            transitionEnd();
        };
    }, [swipeState, navigation]);

    return {
        isSwipeStart,
        swipeState,
    };
}
