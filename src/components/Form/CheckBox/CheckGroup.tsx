import { For } from 'solid-js';
import { Atom, atomization } from '@cn-ui/use';
import { OriginComponent } from '@cn-ui/use';
import { Space, SpaceProps } from '@cn-ui/core';
import { CheckBoxProps, CheckBox } from './CheckBox';

export type CheckGroupData = Omit<CheckBoxProps, 'value'> & { value: Atom<boolean> };
export interface CheckGroupProps extends SpaceProps {
    data: CheckGroupData[] | Atom<CheckGroupData[]>;
    maxCheck?: number;
    /** 当用户试图选中超出 maxCheck 的数目时发生的事件，注意 maxCheck 为 1 时是单选框，有特殊效果 */
    onOverCheck?: (e) => void;
}

export const CheckGroup = OriginComponent<CheckGroupProps, HTMLDivElement>((props) => {
    const data = atomization(props.data);
    return (
        <Space {...props}>
            <For each={data()}>
                {(it) => {
                    return (
                        <CheckBox
                            {...it}
                            onValueInput={async (e, state) => {
                                if (typeof props.maxCheck === 'number' && state) {
                                    if (props.maxCheck === 1) {
                                        // 单选特例
                                        data().forEach((i) => i.value(false));
                                        return;
                                    }

                                    let count = 0;
                                    for (let i of data()) {
                                        if (i.value()) {
                                            count++;
                                            if (count === props.maxCheck) {
                                                props.onOverCheck && props.onOverCheck(e);
                                                return false;
                                            }
                                        }
                                    }
                                }
                            }}
                        ></CheckBox>
                    );
                }}
            </For>
        </Space>
    );
});
