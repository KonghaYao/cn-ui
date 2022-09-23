// import defaultLocale from '../locale/default';
// import Message from '../Message';
// import Notification from '../Notification';
// import Empty from '../Empty';
import { ConfigProviderProps } from './interface';
import { createContext } from 'solid-js';
import { createStore } from 'solid-js/store';

// function renderEmpty(componentName?: string) {
//     switch (componentName) {
//         default:
//             return <Empty />;
//     }
// }

const defaultProps: ConfigProviderProps = {
    // locale: defaultLocale,
    prefixCls: 'cn',
    getPopupContainer: () => document.body,
    size: 'default',
    // renderEmpty,
    focusLock: {
        modal: { autoFocus: true },
        drawer: { autoFocus: true },
    },
    getPrefixCls(componentName: string, customPrefix: string = 'cn') {
        return `${customPrefix}-${componentName}`;
    },
};

const [store, setStore] = createStore<ConfigProviderProps>(defaultProps);
export const GlobalConfigStore = store;
export const setGlobalConfig = setStore;
