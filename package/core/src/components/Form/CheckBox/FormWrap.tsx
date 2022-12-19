import { atom } from '@cn-ui/use';
import { createEffect, For } from 'solid-js';
import { FormFieldOptions } from '../FormFieldOptions';
import { FormWrapComponent } from '../FormTemplate';
import { CheckBox } from './CheckBox';
import { CheckGroup } from './CheckGroup';

export const FormRadio: FormWrapComponent<
    FormFieldOptions.Radio,
    {
        value: boolean;
        label?: string;
    }
> = (props) => {
    return (
        <CheckGroup multi={false}>
            <For each={props.options.options}>
                {(item) => <CheckBox value={item.value} label={item.label}></CheckBox>}
            </For>
        </CheckGroup>
    );
};
