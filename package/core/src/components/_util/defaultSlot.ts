import { JSXElement } from 'solid-js';

/**
 * @zh 只有 undefined 时才使用默认样式,null 为不渲染
 */
export const defaultSlot = (defaultComp: JSXElement, slot?: JSXElement) => {
    return slot === undefined ? defaultComp : slot;
};
