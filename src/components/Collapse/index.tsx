import { Component, createContext, createEffect, mergeProps } from 'solid-js';
import { Atom } from '@cn-ui/use';

export type Controller = { [key: string]: Atom<boolean> };
export const CollapseContext = createContext<{
    lazyload?: boolean;
    destroyOnHide?: boolean;
    onToggle?: (_key: string, state: boolean, _e) => void;
    CommitController: (c: (c: Controller) => Controller) => void;
}>();
export * from './Collapse';
export * from './CollapseItem';
