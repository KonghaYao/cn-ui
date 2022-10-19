import { atom } from '@cn-ui/use';
import { createEffect } from 'solid-js';
import { FormWrapComponent } from '../Form';
import { FormFieldOptions } from '../FormFieldOptions';
import { Select } from './Select';

export const FromSelect: FormWrapComponent<FormFieldOptions.Select, string> = (props) => {
    const value = atom({ value: props.options.default });
    createEffect(() => {
        props.value(value().value);
    });
    return <Select value={value} options={props.options.options}></Select>;
};
