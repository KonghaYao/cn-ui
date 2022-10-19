import { Atom } from '@cn-ui/use';
import { Component } from 'solid-js';
import { FormFieldOptions } from '../Form';
import { Switch } from './Switch';

export const FormSwitch: Component<{ value: Atom<boolean>; options: FormFieldOptions.Switch }> = (
    props
) => {
    return <Switch value={props.value}></Switch>;
};
