import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    IAsyncStorage,
    TGetItem,
    TMergeItem,
    TMultiGet,
    TMultiMerge,
    TMultiRemove,
    TMultiSet,
    TRemoveItem,
    TSetItem,
} from '@reptalieregion/webview-bridge';

const CustomAsyncStorage: IAsyncStorage = {
    setItem: async (payload: TSetItem) => {
        const { key, value } = payload;
        return await AsyncStorage.setItem(key, value);
    },
    getItem: async (payload: TGetItem) => {
        const { key } = payload;
        return await AsyncStorage.getItem(key);
    },
    mergeItem: async (payload: TMergeItem) => {
        const { key, value } = payload;
        return await AsyncStorage.mergeItem(key, value);
    },
    removeItem: async (payload: TRemoveItem) => {
        const { key } = payload;
        return await AsyncStorage.removeItem(key);
    },
    getAllKeys: async () => {
        return await AsyncStorage.getAllKeys();
    },
    multiGet: async (payload: TMultiGet) => {
        const { keys } = payload;
        return await AsyncStorage.multiGet(keys);
    },
    multiSet: async (payload: TMultiSet) => {
        const { keyValuePairs } = payload;
        return await AsyncStorage.multiSet(keyValuePairs);
    },
    multiMerge: async (payload: TMultiMerge) => {
        const { keyValuePairs } = payload;
        return await AsyncStorage.multiMerge(keyValuePairs);
    },
    multiRemove: async (payload: TMultiRemove) => {
        const { keys } = payload;
        return await AsyncStorage.multiRemove(keys);
    },
    clear: async () => {
        return await AsyncStorage.clear();
    },
};

export default CustomAsyncStorage;
