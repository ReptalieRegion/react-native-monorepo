import {
    NextJSPostMessageType,
    NextJSPostReturnType,
    TNextJSBridgeCommand,
    TNextJSBridgeModule,
    TNextJSBridgeReturnType,
    serializeRNCall,
} from '@reptalieregion/webview-bridge';
import WebView from 'react-native-webview';

export type Observers = {
    [key: string]: {
        success: (payload: unknown) => void;
        fail: (error: unknown) => void;
    };
};

type ModuleAndCommand<Module extends TNextJSBridgeModule, Command extends TNextJSBridgeCommand<Module>> = {
    module: Module;
    command: Command;
};

interface IWebviewBridgeManager {
    notifyObservers(message: NextJSPostReturnType): void;
    postMessage(message: NextJSPostMessageType): void;
    registerObserver<
        Module extends TNextJSBridgeModule = TNextJSBridgeModule,
        Command extends TNextJSBridgeCommand<Module> = TNextJSBridgeCommand<Module>,
    >({
        module,
        command,
    }: ModuleAndCommand<Module, Command>): Promise<unknown>;
}

export default class WebviewBridgeManager implements IWebviewBridgeManager {
    private observers: Observers = {};

    constructor(private ref: React.RefObject<WebView<{}>>) {}

    notifyObservers(message: NextJSPostReturnType) {
        const functions = this.observers[`${message.module}.${message.command}`];

        if (functions) {
            const { fail, success } = functions;
            message.payload ? success(message.payload) : fail('no value');
        }
    }

    postMessage(message: NextJSPostMessageType) {
        const serializedMessage = serializeRNCall(message);
        console.log(this.ref.current?.postMessage('hi'));
        this.ref.current?.postMessage(serializedMessage);
    }

    registerObserver<
        Module extends TNextJSBridgeModule = TNextJSBridgeModule,
        Command extends TNextJSBridgeCommand<Module> = TNextJSBridgeCommand<Module>,
    >({ module, command }: ModuleAndCommand<Module, Command>) {
        return new Promise<TNextJSBridgeReturnType<Module, Command>>((resolve, reject) => {
            this.observers[`${module}.${String(command)}`] = {
                success: (payload: any) => resolve(payload),
                fail: (error) => reject(error),
            };
        });
    }
}
