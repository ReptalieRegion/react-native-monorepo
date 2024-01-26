import type { CompositeNavigationProp, CompositeScreenProps, NavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootRoutesParamList } from '@/types/routes/param-list';
import type { PostingParamList } from '@/types/routes/param-list/sharePost';

// 이미지 선택 페이지 Props
type ImagePickScreenProp = NativeStackScreenProps<PostingParamList, 'image-crop'>;

// 이미지 선택 페이지 Header 변경할 Props
type ImagePickChangeHeaderProps = {
    navigation: NativeStackNavigationProp<PostingParamList, 'image-crop'>;
};

// 글쓰기 페이지 Props
type WritePostScreenProps = CompositeScreenProps<
    NativeStackScreenProps<PostingParamList, 'write'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

// 글쓰기 네비게이터
type WritePostNavigationProp = CompositeNavigationProp<
    NavigationProp<PostingParamList, 'write'>,
    NavigationProp<RootRoutesParamList>
>;

// 글쓰기 페이지 Header 변경할 Props
type WritePostChangeHeaderProps = {
    navigation: CompositeNavigationProp<
        NativeStackNavigationProp<PostingParamList, 'write'>,
        NativeStackNavigationProp<RootRoutesParamList>
    >;
};

export type {
    ImagePickChangeHeaderProps,
    ImagePickScreenProp,
    WritePostChangeHeaderProps,
    WritePostNavigationProp,
    WritePostScreenProps,
};
