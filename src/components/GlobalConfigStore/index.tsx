import { ConfigProviderProps } from './interface';
import { createStore } from 'solid-js/store';

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
