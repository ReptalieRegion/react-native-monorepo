import { useState } from 'react';

export function useToggle(defaultValue?: boolean): [boolean, () => void] {
    const [isEnabled, setIsEnabled] = useState(defaultValue ?? false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    return [isEnabled, toggleSwitch];
}
