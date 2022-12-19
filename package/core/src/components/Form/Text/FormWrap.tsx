import { FormWrapComponent } from '../FormTemplate';
import { FormFieldOptions } from '../FormFieldOptions';
import { InputText } from './InputText';

export const FromText: FormWrapComponent<FormFieldOptions.Text, string> = (props) => {
    return (
        <InputText
            {...props.options.params}
            value={props.value}
            style={{
                width: '50%',
            }}
        ></InputText>
    );
};
