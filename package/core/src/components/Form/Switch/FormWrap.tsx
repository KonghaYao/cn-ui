import { FormWrapComponent } from '../FormTemplate';
import { FormFieldOptions } from '../FormFieldOptions';
import { Switch } from './Switch';

export const FormSwitch: FormWrapComponent<FormFieldOptions.Switch, boolean> = (props) => {
    return <Switch {...props.options.params} value={props.value}></Switch>;
};
