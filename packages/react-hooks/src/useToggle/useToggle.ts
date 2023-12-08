import { useState } from 'react';

const useSwitch = (): [boolean, () => void] => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    return [isEnabled, toggleSwitch];
};

export default useSwitch;
