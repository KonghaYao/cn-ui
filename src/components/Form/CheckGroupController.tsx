import { JSXElement } from 'solid-js';
import { reflect } from '../_util/atom';
import { OriginComponent } from '../_util/OriginComponent';
import { CheckBoxProps, CheckBox } from './CheckBox';
import { CheckGroupData } from './CheckGroupData';

export interface CheckGroupControllerProps
    extends Omit<CheckBoxProps, 'onValueInput' | 'value' | 'indeterminate'> {
    data: CheckGroupData[];
    children?: JSXElement;
}
/** 数据驱动的 生成组件 */
export const CheckGroupController = OriginComponent<CheckGroupControllerProps, HTMLDivElement>(
    (props) => {
        const checkedListState = reflect(() => props.data.some((i) => i.value()));
        const indeterminate = reflect(() => !props.data.every((i) => i.value()));
        return (
            <CheckBox
                {...props}
                value={checkedListState}
                indeterminate={indeterminate}
                onValueInput={async (e, value) => {
                    if (indeterminate()) {
                        props.data.forEach((i) => i.value(true));
                        return false;
                    }
                    props.data.forEach((i) => i.value(value));
                    return false;
                }}
            >
                {props.children}
            </CheckBox>
        );
    }
);
