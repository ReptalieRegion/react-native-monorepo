import { useState } from 'react';

export function useSwitch(): [boolean, () => void] {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    return [isEnabled, toggleSwitch];
}
