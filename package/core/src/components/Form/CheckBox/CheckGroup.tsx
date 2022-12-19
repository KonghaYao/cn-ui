import { Component, createContext, For, JSXElement, useContext } from 'solid-js';
import { Atom, atomization } from '@cn-ui/use';
import { OriginComponent } from '@cn-ui/use';
import { CheckBoxProps } from './CheckBox';
import { useSelect } from '@cn-ui/headless';

export type CheckGroupData = Omit<CheckBoxProps, 'value'> & { value: Atom<boolean> };
export interface CheckGroupProps {
    maxCheck?: number;
    /** 当用户试图选中超出 maxCheck 的数目时发生的事件，注意 maxCheck 为 1 时是单选框，有特殊效果 */
    onOverCheck?: (e) => void;
}
export const CheckGroupContext = createContext<ReturnType<typeof useSelect>>();

export const CheckGroupHelper: Component<{
    children: (
        tools: { inverse: () => void; setAll: (value: boolean) => void } & ReturnType<
            typeof useSelect
        >
    ) => JSXElement;
}> = (props) => {
    const state = useContext(CheckGroupContext);
    const { allRegistered, changeSelected } = state;
    const info = {
        ...state,
        inverse() {
            allRegistered().forEach((i) => {
                changeSelected(i);
            });
        },
        setAll(value: boolean) {
            allRegistered().forEach((i) => {
                changeSelected(i, value);
            });
        },
    };
    return props.children(info);
};

export const CheckGroup = OriginComponent<{
    activeIds?: string[] | Atom<string[]>;
    multi?: boolean | Atom<boolean>;
    children: JSXElement;
}>((props) => {
    const activeIds = atomization(props.activeIds ?? []);
    const multi = atomization(props.multi ?? true);
    const select = useSelect({
        activeIds,
        multi,
    });
    return (
        <CheckGroupContext.Provider value={{ ...select }}>
            {props.children}
        </CheckGroupContext.Provider>
    );
});
