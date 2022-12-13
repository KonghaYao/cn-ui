import { createEffect, createSelector } from 'solid-js';
import { Atom, atom, atomization } from '@cn-ui/use';

/** 单一状态中心函数, 一般用于 tabs 页的逻辑，切换目标的状态，状态必定唯一 */
export const useStateManager = function <T>(props: {
    activeId: Atom<string> | string;
    getId?: (data: T) => boolean;
}) {
    const getId =
        props.getId ??
        function (i: any) {
            return i.id;
        };
    const activeId = atomization<string>(props.activeId);
    const StateData = atom<T[]>([]);

    createEffect(() => {
        if (StateData().length && activeId() === null) {
            activeId(getId(StateData()[0]));
        }
    });
    return {
        /** 向状态管理注册一个数据包含状态 */
        register(data: T) {
            StateData([...StateData(), data]);
        },
        activeId,
        StateData,
        isSelected: createSelector(activeId),
    };
};
