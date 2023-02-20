import { OriginComponent } from '@cn-ui/use';
import { Gradient } from '../_util/design';
import { PureButtonProps, PureButton } from './PureButton';

export interface GradientButtonProps extends PureButtonProps {
    color?: keyof typeof Gradient;
    gradient?: true;
}
const useGradientColor = (color: keyof typeof Gradient = 'blue') => {
    return [Gradient.position, Gradient[color]].join(' ');
};
export const GradientButton = OriginComponent<GradientButtonProps, HTMLButtonElement>((props) => {
    return <PureButton {...props} class={props.class(useGradientColor(props.color))}></PureButton>;
});
