import { useMutation } from '@tanstack/react-query';

import { readNotificationPushLog } from '../../repository';

const useReadPushLog = () => {
    return useMutation({
        mutationFn: readNotificationPushLog,
    });
};

export default useReadPushLog;
