import React from 'react';
import { Text } from 'react-native';

import Tag from '@/components/share-post/common/atoms/Tag';

type CommentContentProps = {
    isTag: boolean;
    content: string;
    onPressTag?: () => void;
};

const CommentContent = ({ isTag, content, onPressTag }: CommentContentProps) => {
    return isTag ? <Tag content={content} onPress={onPressTag} /> : <Text>{content}</Text>;
};

export default CommentContent;
