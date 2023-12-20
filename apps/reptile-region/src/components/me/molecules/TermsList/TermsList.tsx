import { color } from '@crawl/design-system';
import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Article, NumberArticle, Title } from '../../atoms';

import { TERMS_TYPE, type Terms } from '@/pages/me/Terms/type';

type TermsListProps = {
    data: Terms[];
};

export default function TermsList({ data }: TermsListProps) {
    const renderItem: ListRenderItem<Terms> = ({ item }) => {
        switch (item.type) {
            case TERMS_TYPE.TITLE:
                return <Title contents={item.contents} />;
            case TERMS_TYPE.ARTICLE:
                return <Article subTitle={item.subTitle} contents={item.contents} />;
            case TERMS_TYPE.NUMBER_ARTICLE:
                return <NumberArticle subTitle={item.subTitle} contents={item.contents} />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <FlashList
                data={data}
                renderItem={renderItem}
                getItemType={(item) => item.type}
                estimatedItemSize={100}
                keyboardShouldPersistTaps={'always'}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
        padding: 10,
    },
});
