// import { ButtonProps } from './interface';
import './style/index.css';
import { OriginComponent, OriginComponentInputType } from '@cn-ui/use';
import { PureButton, PureButtonProps } from './PureButton';
import { TextButton, TextButtonProps } from './TextButton';
import { IWithColorPart, withColor } from '../_util/design/withColor';
import { IWithGradientPart, withGradient } from '../_util/design/withGradient';

export type ButtonProps = PureButtonProps & TextButtonProps & IWithColorPart & IWithGradientPart;
export const Button = (props: OriginComponentInputType<ButtonProps, HTMLButtonElement>) => {
    if (props.gradient) {
        return <GradientButton {...props}></GradientButton>;
    } else if (props.text) {
        return <TextButton {...props}></TextButton>;
    } else if (props.color) {
        return <ColorButton {...props}></ColorButton>;
    } else {
        return <PureButton {...props}></PureButton>;
    }
};

export const ColorButton = withColor(PureButton);
export const GradientButton = withGradient(PureButton);
