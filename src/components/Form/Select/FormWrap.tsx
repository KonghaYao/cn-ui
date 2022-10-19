import { FormWrapComponent } from '../Form';
import { FormFieldOptions } from '../FormFieldOptions';
import { OptionCreator, Select } from './Select';

export const FromSelect: FormWrapComponent<FormFieldOptions.Select, OptionCreator> = (props) => {
    props.value({ value: props.options.default });
    return <Select value={props.value} options={props.options.options}></Select>;
};
