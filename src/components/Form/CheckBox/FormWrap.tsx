import { atom } from '@cn-ui/use';
import { createEffect } from 'solid-js';
import { FormFieldOptions } from '../FormFieldOptions';
import { FormWrapComponent } from '../FormTemplate';
import { CheckBox } from './CheckBox';
import { CheckGroup } from './CheckGroup';

export const FormRadio: FormWrapComponent<
    FormFieldOptions.Radio,
    {
        value: string;
        label?: string;
    }
> = (props) => {
    // 重写默认值
    const inject = props.options.options.map((i) => {
        return {
            children: i.label ?? i.value,
            origin: i,
            value: atom(i.value === props.options.default),
        };
    });

    createEffect(() => {
        const data = inject.map((i) => i.value() === true && i.origin).filter((i) => i)[0];
        data && props.value(data);
    });
    return <CheckGroup options={inject} maxCheck={1}></CheckGroup>;
};
