import { For } from 'solid-js';
import { Atom } from '@cn-ui/use';
import { OriginComponent } from '@cn-ui/use';
import { Space } from '../Space';
import { SpaceProps } from '../Space/interface';
import { CheckBoxProps, CheckBox } from './CheckBox';

export type CheckGroupData = Omit<CheckBoxProps, 'value'> & { value: Atom<boolean> };
export interface CheckGroupProps extends SpaceProps {
    data: CheckGroupData[];
}

export const CheckGroup = OriginComponent<CheckGroupProps, HTMLDivElement>((props) => {
    return (
        <Space {...props}>
            <For each={props.data}>
                {(it) => {
                    return <CheckBox {...it}></CheckBox>;
                }}
            </For>
        </Space>
    );
});
