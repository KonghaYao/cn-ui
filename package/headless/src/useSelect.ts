import { Atom, atomization, reflect } from '@cn-ui/use';
import { createEffect } from 'solid-js';

/** 多选状态管理 */
export const useSelect = function (props: { activeIds: Atom<string[]>; multi?: Atom<boolean> }) {
    const multi = atomization(props.multi ?? true);
    const activeIds = reflect(() => new Set(props.activeIds()));
    createEffect(() => {
        !multi() && props.activeIds((i) => i.slice(0, 1));
    });
    return {
        activeIds,
        isSelected: (id: string) => {
            return activeIds().has(id);
        },
        changeSelected(id: string, state: boolean = undefined) {
            if (state === undefined) {
                state = !activeIds().has(id);
            }
            if (state === true && !activeIds().has(id)) {
                props.activeIds((i) => {
                    if (multi()) {
                        return [...i, id];
                    } else {
                        return [id];
                    }
                });
            } else if (state === false) {
                props.activeIds((i) => i.filter((ii) => ii !== id));
            }
        },
    };
};
