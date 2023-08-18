import { AsyncStorageMessageType, AsyncStorageReturnType } from '@reptalieregion/webview-bridge';

import CustomAsyncStorage from './AsyncStorage';

const AsyncStorageRunner = async ({ module, command, payload }: AsyncStorageMessageType): Promise<AsyncStorageReturnType> => {
    switch (command) {
        case 'getItem':
            return { module, command, payload: await CustomAsyncStorage.getItem(payload) };

        case 'clear':
            await CustomAsyncStorage.clear(payload);
            return { module, command, payload: undefined };

        case 'getAllKeys':
            return { module, command, payload: await CustomAsyncStorage.getAllKeys(payload) };

        case 'mergeItem':
            await CustomAsyncStorage.mergeItem(payload);
            return { module, command, payload: undefined };

        case 'multiGet':
            return { module, command, payload: await CustomAsyncStorage.multiGet(payload) };

        case 'multiMerge':
            await CustomAsyncStorage.multiMerge(payload);
            return { module, command, payload: undefined };

        case 'multiRemove':
            await CustomAsyncStorage.multiRemove(payload);
            return { module, command, payload: undefined };

        case 'multiSet':
            await CustomAsyncStorage.multiSet(payload);
            return { module, command, payload: undefined };

        case 'removeItem':
            await CustomAsyncStorage.removeItem(payload);
            return { module, command, payload: undefined };

        case 'setItem':
            await CustomAsyncStorage.setItem(payload);
            return { module, command, payload: undefined };

        default:
            throw new Error('');
    }
};

export default AsyncStorageRunner;
