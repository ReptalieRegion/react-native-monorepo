import { AsyncStorageMessageType, AsyncStorageReturnType } from '@reptalieregion/webview-bridge';
import CustomAsyncStorage from './AsyncStorage';

const AsyncStorageRunner = async ({ module, command, data }: AsyncStorageMessageType): Promise<AsyncStorageReturnType> => {
    switch (command) {
        case 'getItem':
            return { module, command, data: await CustomAsyncStorage.getItem(data) };

        case 'clear':
            await CustomAsyncStorage.clear(data);
            return { module, command, data: undefined };

        case 'getAllKeys':
            return { module, command, data: await CustomAsyncStorage.getAllKeys(data) };

        case 'mergeItem':
            await CustomAsyncStorage.mergeItem(data);
            return { module, command, data: undefined };

        case 'multiGet':
            return { module, command, data: await CustomAsyncStorage.multiGet(data) };

        case 'multiMerge':
            await CustomAsyncStorage.multiMerge(data);
            return { module, command, data: undefined };

        case 'multiRemove':
            await CustomAsyncStorage.multiRemove(data);
            return { module, command, data: undefined };

        case 'multiSet':
            await CustomAsyncStorage.multiSet(data);
            return { module, command, data: undefined };

        case 'removeItem':
            await CustomAsyncStorage.removeItem(data);
            return { module, command, data: undefined };

        case 'setItem':
            await CustomAsyncStorage.setItem(data);
            return { module, command, data: undefined };

        default:
            throw new Error('');
    }
};

export default AsyncStorageRunner;
