// import MonacoLoader from "https://cdn.skypack.dev/@monaco-editor/loader";
/** @ts-ignore */
import MonacoLoader from '@monaco-editor/loader';
import { CDN } from '../cdn';

/** 获取 Monaco 对象，只会进行一次网络请求  */
export const getMonaco = async () => {
    if (window.monaco) return window.monaco;
    MonacoLoader.config({
        paths: {
            vs: CDN.__monacoCDN__,
        },
        'vs/nls': {
            availableLanguages: {
                '*': 'zh-cn',
            },
        },
    });

    return MonacoLoader.init();
};
