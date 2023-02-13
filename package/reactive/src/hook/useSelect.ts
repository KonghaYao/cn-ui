import { atomization } from '../utils';
import { atom, Atom, reflect } from '../atom/index';
import { createEffect } from 'solid-js';

/**
 * @zh 多选状态管理 */
export const useSelect = function (
    props: { activeIds?: Atom<string[]>; multi?: Atom<boolean> } = {}
) {
    const activeIdsArray = atomization(props.activeIds || []);

    const multi = atomization(props.multi ?? true);
    const activeIdsSet = atom(new Set(activeIdsArray()));

    // 自动强制单选，防止上流 activeIds 强制多选的行为
    createEffect(() => {
        !multi() && activeIdsArray((i) => i.slice(0, 1));
        activeIdsSet(() => new Set(activeIdsArray()));
    });

    /** 曾注册过的状态 */
    const allRegistered = atom(new Set<string>(), { equals: false });

    /** 更改相应 id 的状态 */
    const changeSelected = (id: string, state?: boolean) => {
        // 默认自动置反
        if (state === undefined) state = !activeIdsSet().has(id);

        if (state === true && !activeIdsSet().has(id)) {
            activeIdsArray((i) => {
                if (multi()) {
                    return [...i, id];
                } else {
                    return [id];
                }
            });
        } else if (state === false) {
            activeIdsArray((i) => i.filter((ii) => ii !== id));
        }
    };
    return {
        changeSelected,
        register(id: string, state: boolean) {
            allRegistered((i) => {
                i.add(id);
                return i;
            });
            changeSelected(id, state);
        },
        deregister(id: string) {
            allRegistered((i) => (i.delete(id), i));
        },
        allRegistered,
        activeIds: activeIdsSet,
        isSelected: (id: string) => {
            return activeIdsSet().has(id);
        },
    };
};
