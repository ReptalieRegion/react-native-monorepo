import { INextJSNavigation } from '@reptalieregion/webview-bridge';

import WebviewBridgeManager from '../../utils/WebviewBridgeManager';

const CustomNextJSNavigation = (observer: WebviewBridgeManager): INextJSNavigation => {
    return {
        push: (payload) => {
            observer.postMessage({ module: 'NextJSNavigation', command: 'push', payload });
        },
        back: (payload) => {
            observer.postMessage({ module: 'NextJSNavigation', command: 'back', payload });
        },
        replace: (payload) => {
            observer.postMessage({ module: 'NextJSNavigation', command: 'replace', payload });
        },
        prefetch: (payload) => {
            observer.postMessage({ module: 'NextJSNavigation', command: 'prefetch', payload });
        },
    };
};

export default CustomNextJSNavigation;
