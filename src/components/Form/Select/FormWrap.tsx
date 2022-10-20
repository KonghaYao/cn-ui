import { FormWrapComponent } from '../FormTemplate';
import { FormFieldOptions } from '../FormFieldOptions';
import { OptionCreator, Select } from './Select';
import { InputColor } from './InputColor';
import { Rate } from './Rate';

export const FromSelect: FormWrapComponent<FormFieldOptions.Select, OptionCreator> = (props) => {
    // 重写默认值
    props.value({ value: props.options.default });
    return (
        <Select
            {...props.options.params}
            value={props.value}
            options={props.options.options}
        ></Select>
    );
};
export const FromColor: FormWrapComponent<FormFieldOptions.Color, string> = (props) => {
    return <InputColor {...props.options.params} value={props.value}></InputColor>;
};
export const FromRate: FormWrapComponent<FormFieldOptions.Rate, number> = (props) => {
    return <Rate {...props.options.params} value={props.value}></Rate>;
};
