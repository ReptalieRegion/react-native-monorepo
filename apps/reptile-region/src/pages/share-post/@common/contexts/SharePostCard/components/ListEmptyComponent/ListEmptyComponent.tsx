import { Typo } from '@crawl/design-system';
import React from 'react';
import { View } from 'react-native';

export default function ListEmptyComponent() {
    return (
        <View>
            <Typo variant="heading3">
                {'회원님 안녕하세요.\n' + '현재 작성된 게시물이 없어요.\n' + '처음으로 게시물을 올려보는게 어때요?'}
            </Typo>
        </View>
    );
}
