import { createStore } from 'solid-js/store';

const defaultProps = {
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

const [store, setStore] = createStore(defaultProps);
export const GlobalConfigStore = store;
export const setGlobalConfig = setStore;
export * from './OuterSpace';
