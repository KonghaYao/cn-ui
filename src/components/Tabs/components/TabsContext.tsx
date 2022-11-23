import { createContext } from 'solid-js';
import { Atom } from '@cn-ui/use';
import { TabPaneProps } from '../interface';

export const TabsContext = createContext<{
    /** 注册一个 Tabs */
    register: (data: TabPaneProps) => void;
    activeId: Atom<string>;
    TabsData: Atom<TabPaneProps[]>;
}>();
