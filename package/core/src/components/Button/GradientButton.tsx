import { OriginComponent } from '@cn-ui/use';
import { Gradient, Colors } from '../_util/design';
import { PureButtonProps, PureButton } from './PureButton';

export interface GradientButtonProps extends PureButtonProps {
    color?: keyof typeof Colors;
    gradient?: boolean;
}
const useGradientColor = (color: keyof typeof Colors = 'blue') => {
    return [Gradient.position, Gradient[color]].join(' ');
};
export const GradientButton = OriginComponent<GradientButtonProps, HTMLButtonElement>((props) => {
    return <PureButton {...props} class={props.class(useGradientColor(props.color))}></PureButton>;
});
