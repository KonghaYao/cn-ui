import { JSXElement } from 'solid-js';
import { Atom, atomization, reflect } from '@cn-ui/use';
import { OriginComponent } from '@cn-ui/use';
import { CheckBoxProps, CheckBox } from './CheckBox';
import { CheckGroupData } from './CheckGroup';

export interface CheckGroupControllerProps
    extends Omit<CheckBoxProps, 'onValueInput' | 'value' | 'indeterminate'> {
    data: CheckGroupData[] | Atom<CheckGroupData[]>;
    children?: JSXElement;
}
export const useCheckGroup = (data: CheckGroupData[] | Atom<CheckGroupData[]>) => {
    const dataAtom = atomization(data);
    const state = reflect(() => {
        let isPart = false;
        let allChecked = true;
        dataAtom().forEach((i) => {
            let isChecked = i.value();
            if (isChecked) {
                isPart = true;
            } else {
                allChecked = false;
            }
        });
        return allChecked ? 'all' : isPart ? 'part' : 'none';
    });
    return {
        state,
        inverse() {
            dataAtom().forEach((i) => i.value((i) => !i));
        },
        setAll(value: boolean) {
            dataAtom().forEach((i) => i.value(value));
        },
    };
};

/** 数据驱动的 生成组件 */
export const CheckGroupController = OriginComponent<CheckGroupControllerProps, HTMLDivElement>(
    (props) => {
        // ! 必须传递 Atom 在内部进行动态绑定
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
                            break;
                        case 'all':
                        case 'part':
                            setAll(false);
                            break;
                    }
                    return false;
                }}
            >
                {props.children}
            </CheckBox>
        );
    }
);
