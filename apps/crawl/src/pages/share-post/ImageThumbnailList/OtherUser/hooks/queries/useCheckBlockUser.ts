import useBaseCheckBlockUser from '@/apis/report/queries/useCheckBlockUser';
import type { CheckBlockUser } from '@/types/apis/report/block-user';

export default function useSuspenseCheckBlockUser({ nickname }: CheckBlockUser['Request']) {
    const { data } = useBaseCheckBlockUser({ nickname });

    if (data?.isBlockedUser) {
        throw new Error('차단된 유저');
    }
}
