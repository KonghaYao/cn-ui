import { For } from 'solid-js';
import { Atom, atomization } from '@cn-ui/use';
import { OriginComponent } from '@cn-ui/use';
import { Space } from '../Space';
import { SpaceProps } from '../Space/interface';
import { CheckBoxProps, CheckBox } from './CheckBox';

export type CheckGroupData = Omit<CheckBoxProps, 'value'> & { value: Atom<boolean> };
export interface CheckGroupProps extends SpaceProps {
    data: CheckGroupData[] | Atom<CheckGroupData[]>;
}

export const CheckGroup = OriginComponent<CheckGroupProps, HTMLDivElement>((props) => {
    const data = atomization(props.data);
    return (
        <Space {...props}>
            <For each={data()}>
                {(it) => {
                    return <CheckBox {...it}></CheckBox>;
                }}
            </For>
        </Space>
    );
});
