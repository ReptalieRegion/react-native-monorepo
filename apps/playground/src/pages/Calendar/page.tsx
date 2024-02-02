import { color } from '@crawl/design-system';
import { useNavigation, type NavigationProp } from '@react-navigation/native';
import React from 'react';
import { Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { CalendarRoutesParamList } from '../../types/routes/calendar';

export default function CalendarListPage() {
    const navigation = useNavigation<NavigationProp<CalendarRoutesParamList>>();

    return (
        <SafeAreaView style={styles.wrapper}>
            <Button title="월간 캘린더" onPress={() => navigation.navigate('월간캘린더')} />
            <Button title="주간 캘린더" onPress={() => navigation.navigate('주간캘린더')} />
            <Button title="캘린더접고펴기" onPress={() => navigation.navigate('캘린더접고펴기')} />
            <Button title="캘린더라이브러리" onPress={() => navigation.navigate('캘린더라이브러리')} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
});
