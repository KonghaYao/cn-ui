import { type Accessor, createEffect, untrack } from "solid-js";
import { type Atom, atom, computed } from "../atom/index";
import { updateMapAtom } from "../atom/updateMapAtom";

export type SelectSystem<T> = ReturnType<typeof useSelect<T>>;
export interface SelectOptionsType {
    label?: string | number;
    value: string | number;
    disabled?: boolean;
}

/**
 * @zh 多选状态管理
 * TODO 子集化 Select 保持数据稳定
 * */
export function useSelect<T>(
    options: Accessor<T[]>,
    config: {
        getId?: (item: T) => string;
        /** 默认多选，但是可以取消 */
        multi?: Accessor<boolean>;
        // 当数据中出现不符合规定的数据时，是否保留
        keepUndefinedOption?: boolean;
    } = {},
) {
    const multi = config.multi ?? (() => true);

    /** @ts-ignore 未想到适合的类型挂载 */
    const getId = config.getId ?? ((item) => item.value);
    const optionsIdMap = computed(() => new Map<string, T>(options().map((i) => [getId(i), i])));
    const selectedMap = atom(new Map<string, T>());
    const disabledMap = atom(new Map<string, T>());

    // 自动强制单选，防止多选转单选发生数据错乱
    createEffect(() => {
        // 单选模式，限制选定数据为一个
        !multi() &&
            untrack(selectedMap).size >= 1 &&
            selectedMap((i) => {
                const onlyOneSelected = new Map<string, T>();
                for (const entry of i.entries()) {
                    if (optionsIdMap().has(entry[0])) {
                        onlyOneSelected.set(entry[0], entry[1]);
                        // 如果需要保留未知 option 需要全部遍历
                        if (config.keepUndefinedOption) {
                            // continue;
                        } else {
                            break;
                        }
                    } else if (config.keepUndefinedOption) {
                        onlyOneSelected.set(entry[0], entry[1]);
                    }
                }
                return onlyOneSelected;
            });
    });

    /** 更改相应 id 的状态 */
    const changeSelected = (id: string, state?: boolean) => {
        if (disabledMap().has(id)) return false;
        // 默认自动置反
        if (state === undefined) state = !selectedMap().has(id);

        if (state === true) {
            updateMapAtom(selectedMap, (map) => {
                const item = optionsIdMap().get(id);
                if (!item)
                    throw new Error(
                        "useSelect | changeSelected error: id " + id + " not found in options",
                    );
                if (!multi()) map.clear();
                map.set(id, item);
            });
        } else if (state === false) {
            updateMapAtom(selectedMap, (map) => {
                map.delete(id);
            });
        }
        return state;
    };
    /**
     * 计算函数：用于确定多选的选中状态。
     * 确定是全部选中、部分选中、还是全部未选中。
     */
    const multiSelectedState = computed(() => {
        let hasOneSelected = false; // 是否有一个选项被选中
        let hasOneUnSelected = false; // 是否有一个选项未被选中
        for (const id of optionsIdMap().keys()) {
            if (selectedMap().has(id)) {
                hasOneSelected = true;
            } else {
                hasOneUnSelected = true;
            }
        }

        // 确定选项的选中状态是部分、全部还是未全部选中
        const isPartial = hasOneSelected && hasOneUnSelected;
        const isAll = hasOneSelected && !hasOneUnSelected;

        // 特殊情况处理：如果没有选项或者所有选项都未被选中，则认为是全部未选中（isNone）
        const isNone = (!hasOneSelected && hasOneUnSelected) || optionsIdMap().size === 0;
        return { isAll, isNone, isPartial };
    });

    return {
        multi,
        options,
        optionsIdMap,
        selected: () => {
            return [...selectedMap().values()];
        },
        getId,
        selectedMap,
        toggle: (item: T, state?: boolean) => changeSelected(getId(item), state),
        select: (item: T) => changeSelected(getId(item), true),
        unselect: (item: T) => changeSelected(getId(item), false),

        toggleById: changeSelected,
        selectById: (item: string) => changeSelected(item, true),
        unselectById: (item: string) => changeSelected(item, false),
        /** 清空选中 */
        clearAll() {
            if (config.keepUndefinedOption) {
                updateMapAtom(selectedMap, (newSelected) => {
                    for (const id of optionsIdMap().keys()) {
                        newSelected.delete(id);
                    }
                });
            } else {
                selectedMap(new Map());
            }
        },
        /** 选中所有 */
        selectAll() {
            if (multi()) {
                updateMapAtom(selectedMap, (i) => {
                    for (const item of optionsIdMap()) {
                        i.set(...item);
                    }
                });
            } else {
                throw new Error("useSelect | multi: false | can not trigger selectAll");
            }
        },
        /** 所有选中 */
        isAllSelected() {
            return multiSelectedState().isAll;
        },
        /** 所有未选中 */
        isNoneSelected() {
            return multiSelectedState().isNone;
        },
        /** 是否选中有 */
        isIndeterminate() {
            return multiSelectedState().isPartial;
        },
        isSelected: (item: T) => {
            return selectedMap().has(getId(item));
        },
        /** 检查一个键是否被选中 */
        isSelectedById: (id: string) => {
            return selectedMap().has(id);
        },
        /** 禁用 */
        disabledMap,
        isDisabled(item: T) {
            return disabledMap().has(getId(item));
        },
        isDisabledById(id: string) {
            return disabledMap().has(id);
        },
        disable: (item: T) => {
            updateMapAtom(disabledMap, (i) => i.set(getId(item), item));
        },
        disableById: (id: string) => {
            updateMapAtom(disabledMap, (i) => i.set(id, optionsIdMap().get(id)!));
        },

        /** 响应式同步 model 和 内部的数据 **/
        syncIdArrayModel(model: Atom<string[]>) {
            let lastModel: string[];
            const matched = (a: string[], b: string[]) => {
                if (!a || !b) return false;
                if (a.length !== b.length) return false;
                for (let i = 0; i < a.length; i++) {
                    if (a[i] !== b[i]) return false;
                }
                return true;
            };

            createEffect(() => {
                if (matched(lastModel, model())) return;
                this.clearAll();
                model().forEach((key) => this.selectById(key));
                lastModel = model();
            });
            createEffect(() => {
                const item = this.selected().map((i) => this.getId(i));
                if (matched(lastModel, item)) return;
                lastModel = item;
                model(() => lastModel);
            });
        },
    };
}
