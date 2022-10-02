import { JSXElement } from 'solid-js';
import { reflect } from '@cn-ui/use';
import { OriginComponent } from '../_util/OriginComponent';
import { CheckBoxProps, CheckBox } from './CheckBox';
import { CheckGroupData } from './CheckGroupData';

export interface CheckGroupControllerProps
    extends Omit<CheckBoxProps, 'onValueInput' | 'value' | 'indeterminate'> {
    data: CheckGroupData[];
    children?: JSXElement;
}
export const useCheckGroup = (data: CheckGroupData[]) => {
    const state = reflect(() => {
        let isPart = false;
        let allChecked = data.every((i) => {
            let isChecked = i.value();
            if (isChecked) isPart = true;
            return isChecked;
        });
        return allChecked ? 'all' : isPart ? 'part' : 'none';
    });
    return {
        state,
        inverse() {
            data.forEach((i) => i.value((i) => !i));
        },
        setAll(value: boolean) {
            data.forEach((i) => i.value(value));
        },
    };
};

/** 数据驱动的 生成组件 */
export const CheckGroupController = OriginComponent<CheckGroupControllerProps, HTMLDivElement>(
    (props) => {
        const { state, setAll } = useCheckGroup(props.data);
        return (
            <CheckBox
                {...props}
                value={reflect(() => state() !== 'none')}
                indeterminate={reflect(() => state() === 'part')}
                onValueInput={async (e, value) => {
                    switch (state()) {
                        case 'none':
                            setAll(true);
                        case 'all':
                        case 'part':
                            setAll(false);
                    }
                    return false;
                }}
            >
                {props.children}
            </CheckBox>
        );
    }
);
