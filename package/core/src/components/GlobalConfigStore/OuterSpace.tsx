import { Portal, render } from 'solid-js/web';

import { atom, Atom } from '@cn-ui/use';
import { Component, createContext, For, useContext } from 'solid-js';
import { Relative } from '../Mask';

interface PositionData {
    // TODO 方向方案暂时没有确定
    OutSpaceLayer: Atom<Component[]>;
}
export const OutSpaceContext = createContext<PositionData>();
export class OutSpace {
    static inited = false;
    static OutSpaceLayer: Atom<Component[]> = atom<Component[]>([]);
    static init() {
        if (this.inited) return null;
        this.inited = true;

        // 注意，这个没有被导出
        const OuterSpace = ({}) => {
            const space = useContext(OutSpaceContext);
            const style = {
                'z-index': 1000,
            };
            // ['top', 'tl', 'tr', 'bottom', 'bl', 'br', 'left', 'lt', 'lb', 'right', 'rt', 'rb'] as const;
            return (
                <Relative
                    fixed
                    class={' pointer-events-none top-0 left-0 h-screen w-screen '}
                    style={style}
                >
                    <For each={space.OutSpaceLayer()}>{(Item) => <Item></Item>}</For>
                </Relative>
            );
        };
        /** 向全局注入一个默认的 Layer 空间，生命周期为 solid 全生命 */

        return (
            <Portal mount={document.body}>
                <OutSpaceContext.Provider value={{ OutSpaceLayer: this.OutSpaceLayer }}>
                    <OuterSpace></OuterSpace>
                </OutSpaceContext.Provider>
            </Portal>
        );
    }
    /** 添加独立的根组件 */
    static addLayerLikeSet(Comp: Component) {
        if (this.OutSpaceLayer().some((i) => i === Comp)) return false;
        this.OutSpaceLayer((i) => [...i, Comp]);
        return true;
    }
}
