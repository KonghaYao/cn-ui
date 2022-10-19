import { Atom } from '@cn-ui/use';
import { Component, lazy } from 'solid-js';
import { FormFieldOptions } from './FormFieldOptions';

export type FormWrapComponent<T, D> = Component<{
    value: Atom<D>;
    options: T;
}>;
export type FormTemplate =
    | FormFieldOptions.Select
    | FormFieldOptions.Switch
    | FormFieldOptions.Range
    | FormFieldOptions.Color
    | FormFieldOptions.Rate
    | FormFieldOptions.Text;
export const registerFormComponent = new Map<string, Parameters<typeof lazy>[0]>();
export const defineFormTemplate = (i: FormTemplate[]) => i;
