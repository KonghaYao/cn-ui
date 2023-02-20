import { OriginComponent } from '@cn-ui/use';
import { Colors } from '../_util/design';
import { PureButtonProps, PureButton } from './PureButton';

export interface ColorButtonProps extends PureButtonProps {
    color?: keyof typeof Colors;
    gradient?: boolean;
}
const useColorStyle = (color: keyof typeof Colors = 'blue') => {
    return Colors[color];
};
export const ColorButton = OriginComponent<ColorButtonProps, HTMLButtonElement>((props) => {
    return (
        <PureButton
            {...props}
            class={props.class(useColorStyle(props.color), 'text-white')}
        ></PureButton>
    );
});
