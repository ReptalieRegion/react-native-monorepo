import { faker } from '@faker-js/faker';
import { Typo, color } from '@reptile-region/design-system';
import isEmpty from 'lodash/isEmpty';
import React, { useCallback } from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Avatar, ConditionalRenderer } from '@/components/@common/atoms';

interface ItemProps {
    item: any;
}

const AgendaItem = (props: ItemProps) => {
    const { item } = props;

    const buttonPressed = useCallback(() => {
        Alert.alert('Show me more');
    }, []);

    const itemPressed = useCallback(() => {
        Alert.alert(item.title);
    }, [item.title]);

    if (isEmpty(item)) {
        return null;
    }

    return (
        <TouchableOpacity onPress={itemPressed} style={styles.item}>
            <Avatar image={{ src: faker.image.url() }} size={50} />
            <View style={styles.contentContainer}>
                <Typo variant="title3">{item.name}</Typo>
                <ConditionalRenderer
                    condition={item.memo}
                    trueContent={
                        <Typo
                            variant="body3"
                            color="placeholder"
                            textBreakStrategy="highQuality"
                            lineBreakMode="clip"
                            lineBreakStrategyIOS="hangul-word"
                            numberOfLines={1}
                        >
                            {item.memo}
                        </Typo>
                    }
                />
            </View>
            <View style={styles.itemButtonContainer}>
                <Button color={'grey'} title={'Info'} onPress={buttonPressed} />
            </View>
        </TouchableOpacity>
    );
};

export default React.memo(AgendaItem);

const styles = StyleSheet.create({
    item: {
        padding: 20,
        backgroundColor: color.White.toString(),
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    contentContainer: {
        width: 200,
    },
    itemButtonContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
});
