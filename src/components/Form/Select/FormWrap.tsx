import { FormWrapComponent } from '../FormTemplate';
import { FormFieldOptions } from '../FormFieldOptions';
import { OptionCreator, Select } from './Select';
import { InputColor } from './InputColor';
import { Rate } from './Rate';

export const FromSelect: FormWrapComponent<FormFieldOptions.Select, OptionCreator> = (props) => {
    // 重写默认值
    props.value({ value: props.options.default });
    return <Select value={props.value} options={props.options.options}></Select>;
};
export const FromColor: FormWrapComponent<FormFieldOptions.Color, string> = (props) => {
    return <InputColor value={props.value}></InputColor>;
};
export const FromRate: FormWrapComponent<FormFieldOptions.Rate, number> = (props) => {
    return <Rate value={props.value}></Rate>;
};
