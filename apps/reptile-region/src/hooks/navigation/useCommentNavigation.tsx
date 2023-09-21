import { useNavigation } from '@react-navigation/native';

import { SharePostNavigationProp } from '<SharePostRoutes>';

const useCommentNavigation = () => {
    const navigation = useNavigation<SharePostNavigationProp<'share-post/bottom-sheet/comment'>>();

    const navigationModalDetail = (nickname: string) => {
        navigation.push('share-post/modal/detail', { nickname });
    };

    return { navigationModalDetail };
};

export default useCommentNavigation;
