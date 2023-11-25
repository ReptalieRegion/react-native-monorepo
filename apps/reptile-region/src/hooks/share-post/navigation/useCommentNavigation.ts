import { useNavigation, type CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { RootRoutesParamList } from '@/types/routes/param-list';
import type { CommentParamList } from '@/types/routes/param-list/sharePost';
import type { CommentReplyParams, ImageThumbnailParams } from '@/types/routes/params/sharePost';

type CommentNavigation =
    | CompositeNavigationProp<
          NativeStackNavigationProp<CommentParamList, 'main'>,
          NativeStackNavigationProp<RootRoutesParamList>
      >
    | CompositeNavigationProp<
          NativeStackNavigationProp<CommentParamList, 'reply'>,
          NativeStackNavigationProp<RootRoutesParamList>
      >;

const useCommentNavigation = () => {
    const navigation = useNavigation<CommentNavigation>();

    const navigateDetailPage = (params: Omit<ImageThumbnailParams, 'pageState'>) => {
        navigation.push('share-post/modal', {
            screen: 'modal/image-thumbnail',
            params: { ...params, pageState: 'MODAL' },
        });
    };

    const navigateCommentReplyPage = (params: CommentReplyParams) => {
        navigation.push('reply', params);
    };

    return {
        navigateDetailPage,
        navigateCommentReplyPage,
    };
};

export default useCommentNavigation;
