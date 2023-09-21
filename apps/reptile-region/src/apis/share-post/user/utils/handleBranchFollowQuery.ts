import useCreateFollow from '../hooks/mutations/useCreateFollow';
import useUpdateFollow from '../hooks/mutations/useUpdateFollow';

type HandleBranchFollowQueryProps = {
    isFollow: boolean | undefined;
};

const handleBranchFollowQuery = ({ isFollow }: HandleBranchFollowQueryProps) => {
    return isFollow ? useUpdateFollow : useCreateFollow;
};

export default handleBranchFollowQuery;
