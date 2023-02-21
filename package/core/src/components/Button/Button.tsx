// import { ButtonProps } from './interface';
import './style/index.css';
import { OriginComponent } from '@cn-ui/use';

export type ButtonProps = PureButtonProps &
    TextButtonProps &
    ColorButtonProps &
    GradientButtonProps & {
        gradient?: boolean;
    };
import { PureButton, PureButtonProps } from './PureButton';
import { TextButton, TextButtonProps } from './TextButton';
import { ColorButton, ColorButtonProps } from './ColorButton';
import { GradientButton, GradientButtonProps } from './GradientButton';

export const Button = OriginComponent<ButtonProps, HTMLButtonElement>((props) => {
    if (props.gradient) {
        return <GradientButton {...props}></GradientButton>;
    } else if (props.text) {
        return <TextButton {...props}></TextButton>;
    } else if (props.color) {
        return <ColorButton {...props}></ColorButton>;
    } else {
        return <PureButton {...props}></PureButton>;
    }
});
