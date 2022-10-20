import { FormFieldOptions } from '../FormFieldOptions';
import { FormWrapComponent } from '../FormTemplate';
import { InputNumber } from './InputNumber';
import { Slider } from './Slider';

export const FormNumber: FormWrapComponent<FormFieldOptions.Range, number> = (props) => {
    return (
        <InputNumber
            value={props.value}
            style={{
                width: '50%',
            }}
        ></InputNumber>
    );
};
export const FormSlider: FormWrapComponent<FormFieldOptions.Slider, number> = (props) => {
    return (
        <div
            class="flex "
            style={{
                width: '50%',
            }}
        >
            <span class="px-2">{props.value()}</span>
            <Slider value={props.value}></Slider>
        </div>
    );
};
