import { Atom } from '@cn-ui/use';
import { Component } from 'solid-js';
import { FormWrapComponent } from '../Form';
import { FormFieldOptions } from '../FormFieldOptions';
import { Switch } from './Switch';

export const FormSwitch: FormWrapComponent<FormFieldOptions.Switch, boolean> = (props) => {
    return <Switch value={props.value}></Switch>;
};
